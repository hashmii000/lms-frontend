/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { DollarSign, IndianRupee, Printer, Receipt, ReceiptIcon } from 'lucide-react'
import { Pagination, Empty, Spin } from 'antd'
import { AppContext } from '../../../Context/AppContext'
import { getRequest } from '../../../Helpers'
import Loader from '../../../components/Loading/Loader'
import FeeReportStats from './FeeReportStats'

const StudentFeeCollectionReport = () => {
  const { user } = useContext(AppContext)

  const studentId = user?.profile?.userId
  const sessionId = user?.profile?.session?._id

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [summary, setSummary] = useState(null)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (!studentId || !sessionId) return

    setLoading(true)
    getRequest(
      `reports/fee-collection?sessionId=${sessionId}&studentId=${studentId}&page=${page}&limit=${limit}`,
    )
      .then((res) => {
        const data = res?.data?.data
        setList(data?.list || [])
        setSummary(data?.summary || null)
      })
      .catch(() => {
        setList([])
        setSummary(null)
      })
      .finally(() => setLoading(false))
  }, [studentId, sessionId, page, limit])

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-IN') : '-')

  const handlePrintReceipt = (item) => {
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
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-white border rounded-lg px-4 py-3 mb-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <IndianRupee className="text-red-600" />
          Payment History
        </h1>
        <p className="text-sm text-gray-500">View all your payment receipts</p>
      </div>

      {/* SUMMARY */}
      <FeeReportStats summary={summary} loading={loading} />

      {/* LOADING */}
      {loading ? (
        <div className="bg-white border rounded-lg p-10 text-center">
          <Loader />
          <p className="mt-3 text-gray-500">Loading report...</p>
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white border rounded-lg p-10">
          <Empty description="No Fee Collection Found" />
        </div>
      ) : (
        <div className="bg-white border rounded-lg overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                {[
                  'Sr. No.',
                  'Receipt No',
                  'Date',
                  'Class',
                  'Payment Mode',
                  'Amount Paid',
                  'Payment Status',
                  'Collected By',
                  'Action',
                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-center text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {list.map((item, i) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="text-center py-2">{(page - 1) * limit + i + 1}</td>
                  <td className="text-center">{item.receiptNo}</td>
                  <td className="text-center text-sm">{formatDate(item.createdAt)}</td>
                  <td className="text-center">{item.className}</td>
                  <td className="text-center">
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                      {item.paymentMode}
                    </span>
                  </td>
                  <td className="text-center text-green-600 font-medium">₹{item.amountPaid}</td>
                  <td
                    className={`text-center text-sm font-medium ${
                      item.paymentStatus?.toLowerCase() === 'success'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.paymentStatus}
                  </td>

                  <td className="text-center">{item.clerkName || '-'}</td>

                  <td className="flex justify-center text-center">
                    <button
                      onClick={() => handlePrintReceipt(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-full
                      text-green-600 hover:text-white hover:bg-green-600 transition"
                      title="Print Receipt"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 flex justify-end">
            <Pagination
              current={page}
              pageSize={limit}
              total={summary?.totalReceipts || 0}
              pageSizeOptions={['5', '10', '20', '50', '100', '200', '500', '1000']}
              showSizeChanger
              onChange={(newPage) => {
                setPage(newPage)
              }}
              onShowSizeChange={(current, size) => {
                setLimit(size)
                setPage(1)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentFeeCollectionReport
