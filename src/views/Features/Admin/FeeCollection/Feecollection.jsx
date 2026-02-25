import React, { useContext, useEffect, useState } from 'react'
import { Plus, DollarSign, IndianRupee, Printer, Filter } from 'lucide-react'
import { Pagination, Empty, Button } from 'antd'
import FeePaymentModal from './AddCollection'
import { SessionContext } from '../../../../Context/Seesion'
import { getRequest } from '../../../../Helpers'
import ExportButton from '../../../ExportExcelButton'
import { Modal } from 'antd'

const FeeCollection = () => {
  const { currentSession, sessionsList1 } = useContext(SessionContext)

  /* ---------------- TEMP FILTERS ---------------- */
  const [tempSession, setTempSession] = useState('')
  const [tempClassId, setTempClassId] = useState('')
  const [streams, setStreams] = useState([])
  const [selectedStreamId, setSelectedStreamId] = useState('')
  const [updateStatus, setUpdateStatus] = useState(false)

  /* ---------------- APPLIED FILTERS ---------------- */
  const [session, setSession] = useState('')
  const [classId, setClassId] = useState('')
  const [isApplied, setIsApplied] = useState(false)
  const [showStudentDropdown, setShowStudentDropdown] = useState(false)
  const [searchStudentText, setSearchStudentText] = useState('')
  const [appliedStudentId, setAppliedStudentId] = useState('')
  const [applyLoading, setApplyLoading] = useState(false)

  /* ---------------- DATA ---------------- */
  const [classes, setClasses] = useState([])
  const [studentData, setStudentData] = useState(null)
  const [ledgerData, setLedgerData] = useState([])
  const [studentOptions, setStudentOptions] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')

  /* ---------------- UI ---------------- */
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [showMonthModal, setShowMonthModal] = useState(false)
  const [selectedMonthLedger, setSelectedMonthLedger] = useState(null)

  const isSeniorClass = (classObj) => {
    return classObj?.isSenior === true
  }

  /* ---------------- DEFAULT SESSION ---------------- */
  useEffect(() => {
    if (currentSession?._id) {
      setTempSession(currentSession._id)
    }
  }, [currentSession])

  /* ---------------- LOAD CLASSES ---------------- */
  useEffect(() => {
    if (!currentSession?._id) return
    getRequest(`classes?isPagination=false&session=${currentSession._id}`)
      .then((res) => setClasses(res.data?.data?.classes || []))
      .catch(console.error)
  }, [currentSession])

  /* ---------------- LOAD STUDENTS (DROPDOWN) ---------------- */
  useEffect(() => {
    if (!tempSession || !tempClassId) return
    let url = `studentEnrollment?session=${tempSession}&currentClass=${tempClassId}`

    const selectedClass = classes.find((c) => c._id === tempClassId)

    if (selectedClass?.isSenior && selectedStreamId) {
      url += `&stream=${selectedStreamId}`
    }

    getRequest(url)
      .then((res) => {
        setStudentOptions(res.data?.data?.students || [])
      })
      .catch(console.error)
  }, [tempSession, tempClassId, selectedStreamId])

  useEffect(() => {
    const selectedClass = classes.find((c) => c._id === tempClassId)
    if (!selectedClass) return

    if (isSeniorClass(selectedClass)) {
      getRequest(`streams?classId=${tempClassId}`)
        .then((res) => setStreams(res.data?.data?.streams || []))
        .catch(console.error)
    } else {
      setStreams([])
      setSelectedStreamId('')
    }
  }, [tempClassId, classes])

  /* ---------------- LOAD FEE LEDGER ---------------- */
  useEffect(() => {
    if (!isApplied || !session || !classId) return

    let url = `student-fees/ledger?sessionId=${session}&classId=${classId}`

    if (appliedStudentId) {
      url += `&studentId=${appliedStudentId}`
    }

    const selectedClass = classes.find((c) => c._id === classId)

    if (selectedClass && isSeniorClass(selectedClass.name) && selectedStreamId) {
      url += `&streamId=${selectedStreamId}`
    }

    console.log('✅ FINAL LEDGER URL:', url)

    // getRequest(url)
    //   .then((res) => {
    //     console.log('🔵 LEDGER API RAW RESPONSE:', res.data)

    //     const data = res.data?.data

    //     if (!data || !data.student || !data.ledger) {
    //       console.warn('❌ Invalid response structure')
    //       setStudentData(null)
    //       setLedgerData([])
    //       return
    //     }

    //     setStudentData(data.student)

    //     // Convert ledger object to array format
    //     const ledgerArray = []
    //     Object.keys(data.ledger).forEach((month) => {
    //       const monthData = data.ledger[month]
    //       if (monthData.items && Array.isArray(monthData.items)) {
    //         monthData.items.forEach((item) => {
    //           ledgerArray.push({
    //             month,
    //             ...item,
    //           })
    //         })
    //       }
    //     })

    //     console.log('🟢 PROCESSED LEDGER ARRAY:', ledgerArray)
    //     setLedgerData(ledgerArray)
    //     setPage(1)
    //   })
    //   .catch((err) => {
    //     console.error('🔥 LEDGER API ERROR:', err)
    //     setStudentData(null)
    //     setLedgerData([])
    //   })
    getRequest(url)
      .then((res) => {
        const data = res.data?.data

        if (!data || !data.student || !data.ledger) {
          setStudentData(null)
          setLedgerData([])
          return
        }

        setStudentData(data.student)

        setLedgerData(data.ledger || [])

        setPage(1)
      })
      .catch((err) => {
        console.error(err)
        setStudentData(null)
        setLedgerData([])
      })
      .finally(() => {
        setApplyLoading(false) // ✅ 🔑 loader OFF here
      })
  }, [isApplied, session, classId, appliedStudentId, selectedStreamId, updateStatus])

  /* ---------------- SEARCH + PAGINATION ---------------- */
  const paginatedData = ledgerData.slice((page - 1) * limit, page * limit)

  const filteredStudentsForSearch = studentOptions.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.studentId} ${s.fatherName || ''}`
      .toLowerCase()
      .includes(searchStudentText.toLowerCase()),
  )

  /* ---------------- HELPERS ---------------- */
  const getTotalFee = () => {
    return ledgerData.reduce((sum, item) => sum + (item.totalAmount || 0), 0)
  }

  const getTotalPaid = () => {
    return ledgerData.reduce((sum, item) => sum + (item.paidAmount || 0), 0)
  }

  const getTotalDue = () => {
    return ledgerData.reduce((sum, item) => sum + (item.dueAmount || 0), 0)
  }

  /* ---------------- APPLY & CLEAR ---------------- */
  const applyFilter = () => {
    if (!tempSession || !tempClassId) {
      toast.error('Please select session & class')
      return
    }

    setApplyLoading(true) // ✅ loader ON
    setSession(tempSession)
    setClassId(tempClassId)
    setSelectedStreamId(selectedStreamId)
    setAppliedStudentId(selectedStudentId)
    setIsApplied(true)
    setPage(1)
  }
  console.log('STUDENT ID SENT 👉', appliedStudentId)

  const clearFilter = () => {
    setTempSession('')
    setTempClassId('')
    setSession('')
    setClassId('')
    setStudentData(null)
    setLedgerData([])
    setStudentOptions([])
    setSelectedStudentId('')
    setAppliedStudentId('')
    setSearchStudentText('')
    setShowStudentDropdown(false)
    setSelectedStreamId('')
    setIsApplied(false)
  }

  const selectedTempClass = classes.find((c) => c._id === tempClassId)
  const showStreamFilter = selectedTempClass && isSeniorClass(selectedTempClass)

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN')
  }
  const printReceipt = (referenceId) => {
    // TODO: backend API call
    // getRequest(`student-fees/receipt/${referenceId}`)
  }

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-lg border px-4 py-2 mb-6 flex items-center">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="text-[#e24028]" />
            Fee Collection
          </h1>
          <p className="text-sm text-gray-500 mt-1">View and manage student fee payments</p>
        </div>

        {isApplied && ledgerData.length > 0 && (
          <div className="ml-auto">
            <ExportButton data={ledgerData} fileName="FeeCollection.xlsx" sheetName="Fee Ledger" />
          </div>
        )}
      </div>

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

        <div className=" flex flex-wrap gap-4  text-sm">
          {/* Session */}
          <div className="w-40">
            <label className="mb-1">Session</label>
            <select
              className="border rounded-md w-full py-2 px-4"
              value={tempSession}
              onChange={(e) => setTempSession(e.target.value)}
            >
              <option value="">Select</option>
              {sessionsList1.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.sessionName}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div className="w-40">
            <label className="mb-1">Class</label>
            <select
              className="border rounded-md w-full py-2 px-4"
              value={tempClassId}
              onChange={(e) => setTempClassId(e.target.value)}
            >
              <option value="">Select</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {showStreamFilter && (
            <div className="w-40">
              <label className="mb-1">Stream</label>
              <select
                className="border rounded-md w-full py-2 px-4"
                value={selectedStreamId}
                onChange={(e) => setSelectedStreamId(e.target.value)}
              >
                <option value="">Select Stream</option>
                {streams.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search */}
          <div className="w-64 relative">
            <label className="mb-1">Search Student</label>
            <input
              className="border rounded-md w-full py-2 px-4"
              placeholder="Type name / student id"
              value={searchStudentText}
              onChange={(e) => {
                const value = e.target.value
                setSearchStudentText(value)
                setShowStudentDropdown(true)

                if (!value) {
                  setSelectedStudentId('')
                }
              }}
              onFocus={() => setShowStudentDropdown(true)}
            />

            {/* DROPDOWN */}
            {tempClassId && showStudentDropdown && searchStudentText && (
              <div className="absolute z-50 bg-white border rounded-md w-full max-h-56 overflow-y-auto shadow">
                {filteredStudentsForSearch.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500">No students found</div>
                ) : (
                  filteredStudentsForSearch.map((s) => (
                    <div
                      key={s._id}
                      className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setSearchStudentText(
                          `${s.firstName} ${s.lastName} (${s.studentId}) - ${s.fatherName || ''}`,
                        )
                        setSelectedStudentId(s?.userId?._id)
                        setShowStudentDropdown(false)
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {s.firstName} {s.lastName}
                          <span className="text-xs text-gray-500 ml-2">({s.studentId})</span>
                        </span>
                        {s.fatherName && (
                          <span className="text-xs text-gray-600">{s.fatherName}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={applyFilter}
              disabled={applyLoading}
              className={`px-4 py-2 rounded text-white flex items-center gap-2
    ${applyLoading ? 'bg-[#0c3b73] cursor-not-allowed' : 'bg-[#0c3b73]'}
  `}
            >
              {applyLoading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {applyLoading ? 'Applying...' : 'Apply'}
            </button>

            <button onClick={clearFilter} className="border px-4 py-2 rounded">
              Clear
            </button>
          </div>
          {isApplied && ledgerData.length > 0 && (
            <div className="ml-auto">
              <button
                className="bg-[#0c3b73] mt-4 hover:bg-[#0c3b73] text-white px-6 py-2 rounded-md font-medium shadow"
                onClick={() => {
                  setSelectedStudent({
                    sessionId: session,
                    studentId: appliedStudentId,
                    classId: classId,
                    streamId: selectedStreamId || null,
                    name: studentData?.name,
                    studentIdNumber: studentData?.studentId,
                    className: studentData?.class,
                    sectionName: studentData?.section,
                  })
                  setIsModalOpen(true)
                }}
              >
                Pay Now
              </button>
            </div>
          )}
          {/* PAY NOW ACTION BAR */}
        </div>
      </div>

      {/* TABLE / EMPTY STATES */}
      {!isApplied ? (
        <div className="bg-white border rounded-lg p-6 text-center">
          <Empty description="Please select filters and click Apply to show data" />
        </div>
      ) : ledgerData.length === 0 ? (
        <div className="bg-white border rounded-lg p-6 text-center">
          <Empty description="No Fee Records Found" />
        </div>
      ) : (
        <div className="bg-white border rounded-lg overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                {[
                  'Sr. No.',
                  'Month',
                  // 'Fee Head',
                  // 'Period',
                  // 'Due Date',
                  'Total Amount',
                  'Paid Amount',
                  'Due Amount',
                  'Status',
                  // 'Action',
                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-center text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, i) => {
                const status = item.totalDue === 0 ? 'PAID' : item.totalPaid > 0 ? 'PARTIAL' : 'DUE'

                const statusColor =
                  status === 'PAID'
                    ? 'bg-green-100 text-green-800'
                    : status === 'PARTIAL'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-red-100 text-red-800'

                return (
                  <tr
                    key={item.period}
                    className="border-b hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setSelectedMonthLedger(item)
                      setShowMonthModal(true)
                    }}
                  >
                    <td className="text-center py-2">{(page - 1) * limit + i + 1}</td>
                    <td className="text-center font-semibold">{item.period}</td>
                    <td className="text-center font-semibold">₹{item.totalAmount}</td>
                    <td className="text-center text-green-600 font-semibold">₹{item.totalPaid}</td>
                    <td className="text-center text-red-600 font-semibold">₹{item.totalDue}</td>
                    <td className="text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
                        {status}
                      </span>
                    </td>
                    {/* <td className="text-center">
                      <Button size="small" type="link" onClick={() => handlePrint(item)}>
                        <Printer size={13} /> Print
                      </Button>
                    </td> */}
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="p-4 flex justify-end">
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              pageSizeOptions={['5', '10', '20', '50', '100', '200', '500', '1000']}
              showSizeChanger
              showQuickJumper
              onChange={(newPage) => setPage(newPage)}
              onShowSizeChange={(current, size) => {
                setLimit(size)
                setPage(1)
              }}
            />
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <FeePaymentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          studentData={selectedStudent}
          setUpdateStatus={setUpdateStatus}
        />
      )}

      <Modal
        open={showMonthModal}
        onCancel={() => setShowMonthModal(false)}
        footer={null}
        centered
        width={700}
        destroyOnClose
        title={
          <span className="text-lg font-semibold">{selectedMonthLedger?.period} Fee Details</span>
        }
      >
        {selectedMonthLedger && (
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  {['Fee Head', 'Due Date', 'Total', 'Paid', 'Due', 'Status'].map((h) => (
                    <th key={h} className="px-3 py-2 text-sm font-semibold text-center">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {selectedMonthLedger.items.map((item) => (
                  <tr key={item.referenceId} className="border-b">
                    <td className="text-center">{item.feeHead}</td>
                    <td className="text-center">{formatDate(item.dueDate)}</td>
                    <td className="text-center">₹{item.totalAmount}</td>
                    <td className="text-center text-green-600">₹{item.paidAmount}</td>
                    <td className="text-center text-red-600">₹{item.dueAmount}</td>
                    <td className="text-center">
                      <span className="text-xs font-semibold">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FeeCollection
