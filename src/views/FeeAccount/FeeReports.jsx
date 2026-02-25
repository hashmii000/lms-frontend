/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { IndianRupee, FileText, TrendingUp, Users, Download, Printer, Filter } from 'lucide-react'
import { Select, DatePicker, Button, Pagination } from 'antd'
import dayjs from 'dayjs'
import { getRequest } from '../../Helpers'
import { SessionContext } from '../../Context/Seesion'
import Loader from '../../components/Loading/Loader'
import FeeReportsStats from './FeeReportsStasts'

const { Option } = Select

const FeeReports = () => {
  const {
    currentSession,
    sessionsList1 = [],
    loading: sessionLoading = false,
  } = useContext(SessionContext)

  /* ------------------ STATES ------------------ */
  const [data, setData] = useState([])
  const [summaryApi, setSummaryApi] = useState({})
  const [loading, setLoading] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [pagination, setPagination] = useState(null)

  const [classes, setClasses] = useState([])

  // 🔥 applied = API call ke liye
  const [appliedFilters, setAppliedFilters] = useState({
    sessionId: null,
    classId: null,
    fromDate: null,
    toDate: null,
  })

  // 🔥 draft = UI ke liye
  const [draftFilters, setDraftFilters] = useState({
    sessionId: null,
    classId: null,
    fromDate: null,
    toDate: null,
  })

  const fetchInitialReport = async (filters) => {
    try {
      setLoading(true) // ✅ ADD

      const params = {
        sessionId: filters.sessionId,
        page: 1,
        limit,
      }

      const query = new URLSearchParams(params).toString()
      const res = await getRequest(`reports/fee-collection?${query}`)

      setData(res?.data?.data?.list || [])
      setSummaryApi(res?.data?.data?.summary || {})
      setPagination(res?.data?.data?.pagination || null)

      setPage(res?.data?.data?.pagination?.currentPage || 1)
      setLimit(res?.data?.data?.pagination?.perPage || limit)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false) // ✅ ADD
    }
  }

  /* ------------------ SESSION CHANGE ------------------ */
  useEffect(() => {
    if (!currentSession?._id) return

    const base = {
      sessionId: currentSession._id,
      classId: null,
      fromDate: null,
      toDate: null,
    }

    setDraftFilters(base)
    setIsApplied(false)

    fetchInitialReport(base) // ✅ auto load WITHOUT loader
  }, [currentSession])

  /* ------------------ LOAD CLASSES ------------------ */
  useEffect(() => {
    getRequest('classes?isPagination=false')
      .then((res) => {
        setClasses(res?.data?.data?.classes || [])
      })
      .catch(() => {})
  }, [])

  /* ------------------ FETCH REPORT ------------------ */
  useEffect(() => {
    if (!appliedFilters.sessionId) return
    fetchReport(appliedFilters)
  }, [appliedFilters.sessionId])

  const fetchReport = async (filters, pageNo = page, pageSize = limit) => {
    try {
      setLoading(true)

      const params = {
        sessionId: filters.sessionId,
        classId: filters.classId,
        fromDate: filters.fromDate ? dayjs(filters.fromDate).format('YYYY-MM-DD') : null,
        toDate: filters.toDate ? dayjs(filters.toDate).format('YYYY-MM-DD') : null,
        page: pageNo,
        limit: pageSize,
      }

      Object.keys(params).forEach((k) => params[k] == null && delete params[k])

      const query = new URLSearchParams(params).toString()
      const res = await getRequest(`reports/fee-collection?${query}`)

      setData(res?.data?.data?.list || [])
      setSummaryApi(res?.data?.data?.summary || {})
      setPagination(res?.data?.data?.pagination || null)

      setPage(res?.data?.data?.pagination?.currentPage || pageNo)
      setLimit(res?.data?.data?.pagination?.perPage || pageSize)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!appliedFilters.sessionId) return
    fetchReport(appliedFilters, page, limit)
  }, [appliedFilters])

  // const handleApply = () => {
  //   setIsApplied(true)
  //   setPage(1)
  //   fetchReport(draftFilters, 1, limit)
  // }

  const handleApply = () => {
    setIsApplied(true)
    setPage(1)
    setAppliedFilters({ ...draftFilters })
  }

  const handleClear = () => {
    setIsApplied(false)
    setData([])
    setSummaryApi({})
    setDraftFilters({
      sessionId: currentSession?._id || null,
      classId: null,
      fromDate: null,
      toDate: null,
    })
  }

  /* ------------------ SUMMARY ------------------ */
  const summary = useMemo(() => {
    const total = summaryApi?.totalCollection || 0
    const receipts = summaryApi?.totalReceipts || 0

    return {
      total,
      receipts,
      avg: receipts ? Math.round(total / receipts) : 0,
    }
  }, [summaryApi])

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-IN') : '-')

  /* ------------------ CSV ------------------ */
  const handlePrint = (item) => {
    const receiptWindow = window.open('', '_blank', 'width=794,height=1123')

    receiptWindow.document.write(`
<html>
<head>
<meta charset="UTF-8" />
<title>Fee Payment Receipt</title>

<style>
@page {
  size: A4;
  margin: 10mm;
}

body {
  font-family: Arial, sans-serif;
  width: 210mm;
  height: 297mm;
  margin: 0;
  padding: 0;
}

.container {
  width: 190mm;
  margin: auto;
  border: 2px solid black;
  padding: 15px;
  box-sizing: border-box;
}

.header {
  text-align: center;
  border-bottom: 2px solid black;
  padding-bottom: 8px;
}

.header h1 {
  margin: 0;
  font-size: 22px;
}

.sub-title {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 5px;
  margin-top: 5px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
  font-size: 13px;
}

.info-grid div {
  padding: 6px;
  border-right: 1px solid black;
}

.info-grid div:nth-child(2n) {
  border-right: none;
}

.details {
  border-bottom: 1px solid black;
  padding: 8px 0;
  font-size: 13px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 13px;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

th {
  background: #f2f2f2;
}

.total-row {
  font-weight: bold;
  background: #f9f9f9;
}

.signatures {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 60px;
  text-align: center;
  font-size: 13px;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
</head>

<body>

<div style="width:800px; margin:auto; border:1px solid #000; font-family:Arial, sans-serif; font-size:13px;">

  <!-- HEADER SECTION -->
  <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border-bottom:1px solid #000;">
    
    <!-- Left Logo -->
    <div>
    </div>

    <!-- Center Title -->
    <div style="text-align:center;">
      <div style="font-weight:bold; font-size:18px;">
        YOUR SCHOOL NAME HERE
      </div>
      <span style="font-size:12px;">
                School Address Here (Affiliated to CBSE | UDISE Code - 0123456789)
      </span>
    </div>

    <!-- Right Image (Optional) -->
    <div>
    </div>
  </div>

  <!-- RECEIPT TITLE -->
  <div style="text-align:center; font-weight:bold; padding:6px; ">
    FEE PAYMENT RECEIPT
  </div>

  <!-- DETAILS TABLE -->
  <table style="width:100%; border-collapse:collapse;text-align:left ">

   
    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2; font-weight:bold; text-align:left">
        Status
      </td>
      <td style="border:1px solid #000; padding:6px; font-weight:bold; text-align:left">
        ${item.paymentStatus || '-'}
      </td>
    </tr>

    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2; text-align:left">
        Class
      </td>
      <td style="border:1px solid #000; padding:6px;text-align:left">
        ${item.className || '-'}
      </td>
    </tr>

    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2;text-align:left">
        Receipt No
      </td>
      <td style="border:1px solid #000; padding:6px; text-align:left">
        ${item.receiptNo || '-'}
      </td>
    </tr>

    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2; text-align:left">
        Payment Date
      </td>
      <td style="border:1px solid #000; padding:6px; text-align:left">
        ${formatDate(item.createdAt)}
      </td>
    </tr>

    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2; text-align:left">
        Payment Mode
      </td>
      <td style="border:1px solid #000; padding:6px; text-align:left">
        ${item.paymentMode || '-'}
      </td>
    </tr>

   

    <tr>
      <td style="border:1px solid #000; padding:6px; background:#f2f2f2;text-align:left ">
        Amount (₹)
      </td>
      <td style="border:1px solid #000; padding:6px;text-align:left ">
        ${item.amountPaid || '-'}
      </td>
    </tr>

    <!-- IMPORTANT NOTE -->
    <tr>
      <td colspan="2" style="border:1px solid #000; padding:8px; font-size:12px;text-align:left">
        <b>Important Note:</b> Please keep this receipt for future reference.
      </td>
    </tr>

  </table>

</div>

<script>
window.onload = function () {
  window.print();
}
</script>

</body>
</html>
`)

    receiptWindow.document.close()
  }

  return (
    <div className="min-h-screen text-sm text-gray-700">
      {/* HEADER */}
      <div className="mb-4 px-4 py-2 bg-white rounded-lg border flex items-center justify-between">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="text-red-500" /> Fee Reports
          </h1>
          <p className="text-sm text-gray-500">Automated fee collection report</p>
        </div>

        {/* RIGHT BUTTON */}
        {/* <button
          onClick={downloadCSV}
          className="flex items-center gap-1 text-white bg-[#0c3b73] px-3 py-1.5 rounded"
        >
          <Download size={14} /> Download
        </button> */}
      </div>

      {/* SUMMARY */}
      {/* <div className="grid md:grid-cols-3 gap-3 mb-4">
        <SummaryCard
          title="Total Collection"
          value={`₹${summary.total}`}
          icon={<FileText size={16} />}
        />
        <SummaryCard
          title="Total Receipts"
          value={summary.receipts}
          icon={<TrendingUp size={16} />}
        />
        <SummaryCard title="Average Amount" value={`₹${summary.avg}`} icon={<Users size={16} />} />
      </div> */}

      {/* SUMMARY */}
      <FeeReportsStats summary={summary} loading={loading} />

      {/* FILTERS */}

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2 relative">
          <div className="flex items-center  gap-1">
            <div className=" rounded-lg flex items-center justify-center ">
              <Filter className="w-5 h-5 text-red-600 " />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-0">Filters & Search</h3>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap gap-3">
          {/* SESSION */}
          <Select
            value={draftFilters.sessionId}
            // disabled
            loading={sessionLoading}
            className="w-full sm:w-[220px]"
            placeholder="Session"
          >
            {(sessionsList1 || []).map((s) => (
              <Option key={s._id} value={s._id}>
                {s.sessionName || s.name}
              </Option>
            ))}
          </Select>

          {/* CLASS */}
          <Select
            allowClear
            placeholder="Select Class"
            value={draftFilters.classId}
            className="w-[200px]"
            onChange={(v) => setDraftFilters((p) => ({ ...p, classId: v }))}
          >
            {classes.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          {/* FROM DATE */}
          <DatePicker
            value={draftFilters.fromDate}
            onChange={(v) => setDraftFilters((p) => ({ ...p, fromDate: v }))}
            placeholder="From Date"
          />

          {/* TO DATE */}
          <DatePicker
            value={draftFilters.toDate}
            onChange={(v) => setDraftFilters((p) => ({ ...p, toDate: v }))}
            placeholder="To Date"
          />

          {/* APPLY */}
          {/* <Button
          type="[#0c3b73]"
          className="bg-[#0c3b73] text-white"
          onClick={() => setAppliedFilters(draftFilters)}
        >
          Apply Filter
        </Button> */}
          <Button
            loading={loading}
            disabled={loading}
            className="bg-[#0c3b73] text-white"
            onClick={handleApply}
          >
            Apply
          </Button>

          {isApplied && (
            <Button className="border" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* TABLE */}
      {/* <div className="bg-white rounded-lg border overflow-x-auto">
        <div className="flex justify-between px-4 py-2 border-b">
          <h2 className="font-semibold">Fee Collection List</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <Th>Receipt</Th>
              <Th>Class</Th>
              <Th>Amount</Th>
              <Th>Payment</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No Data
                </td>
              </tr>
            ) : (
              data.map((i) => (
                <tr key={i._id} className="border-t hover:bg-indigo-50">
                  <td className="px-4 py-2">{i.receiptNo}</td>
                  <td className="px-4 py-2">{i.className}</td>
                  <td className="px-4 py-2 text-green-600">₹{i.amountPaid}</td>
                  <td className="px-4 py-2">{i.paymentMode}</td>
                  <td className="px-4 py-2">{dayjs(i.createdAt).format('DD-MM-YYYY')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> */}
      {/* TABLE */}
      <div className="relative bg-white border rounded-lg overflow-x-auto min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 z-30 bg-white/70 flex items-center justify-center">
            <Loader />
          </div>
        )}

        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              {[
                'Sr. No.',
                'Receipt No',
                'Class',
                'Payment Mode',
                'Paid Amount',
                'Date',
                'Status',
                'Action',
              ].map((h) => (
                <th key={h} className="px-4 py-2 text-center text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!loading && data.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No Fee Records Found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="text-center py-2">{(page - 1) * limit + index + 1}</td>
                  <td className="text-center font-medium">{item.receiptNo}</td>
                  <td className="text-center">{item.className}</td>
                  <td className="text-center">{item.paymentMode}</td>
                  <td className="text-center font-semibold text-green-600">₹{item.amountPaid}</td>
                  <td className="text-center text-sm">
                    {dayjs(item.createdAt).format('DD-MM-YYYY')}
                  </td>
                  <td className="text-center">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button size="small" type="link" onClick={() => handlePrint(item)}>
                      <Printer size={13} /> Print
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* PAGINATION */}
        {pagination && (
          <div className="p-4 flex justify-end">
            <Pagination
              current={pagination?.currentPage}
              pageSize={pagination?.perPage}
              total={pagination?.totalRows}
              pageSizeOptions={['5', '10', '20', '50', '100', '200', '500', '1000']}
              showSizeChanger
              onChange={(newPage, newSize) => {
                setPage(newPage)
                setLimit(newSize)
                fetchReport(draftFilters, newPage, newSize)
              }}
              onShowSizeChange={(current, size) => {
                setLimit(size)
                setPage(1)
                fetchReport(draftFilters, 1, size)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------ COMPONENTS ------------------ */

const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white border rounded-lg p-3 flex justify-between">
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
    {icon}
  </div>
)

const Th = ({ children }) => <th className="px-4 py-2 text-left">{children}</th>

export default FeeReports
