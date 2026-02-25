/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { DollarSign, IndianRupee, Plus } from 'lucide-react'
import { Pagination, Empty, Spin } from 'antd'
import { AppContext } from '../../../Context/AppContext'
import { getRequest, postRequest } from '../../../Helpers'

import RenderRazorPay from '../../payment/RenderRazorPay'
import { Modal, Input, Button } from 'antd'
import Loader from '../../../components/Loading/Loader'
import FeeSummaryStats from './FeeSummaryStats'
import MonthlyInvoice from './MonthlyInvoice'
const suggestedAmounts = [100, 500, 1000, 1500, 2000, 2500, 5000, 10000]

const FeePaymentModal = ({ isModalOpen, setIsModalOpen, onPay }) => {
  const [amount, setAmount] = useState('')

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      alert('Please enter valid amount')
      return
    }
    onPay(amount)
  }

   const handleAmountClick = (value) => {
    setAmount(value.toString())
  }
  return (
     <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={420}
      title={
        <div className="text-center">
          <h2 className="text-lg font-semibold text-[#0c3b73]">
            School Fee Payment
          </h2>
          <p className="text-xs text-gray-500">
            Secure Online Payment
          </p>
        </div>
      }
    >
      <div className="space-y-5">

        {/* Amount Input */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Enter Amount
          </label>

          <Input
            size="large"
            prefix={<IndianRupee size={18} />}
            placeholder="Enter amount"
            value={amount}
            type="number"
            min={0}
            className="mt-2 rounded-lg"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault()
              }
            }}
            onChange={(e) => {
              const value = e.target.value
              if (Number(value) < 0) return
              setAmount(value)
            }}
          />
        </div>

        {/* Suggested Amount Buttons */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Quick Select Amount
          </p>

          <div className="grid grid-cols-4 gap-2">
            {suggestedAmounts.map((amt) => (
              <Button
                key={amt}
                type={amount === amt.toString() ? 'primary' : 'default'}
                className={`rounded-lg ${
                  amount === amt.toString()
                    ? 'bg-[#0c3b73]'
                    : ''
                }`}
                onClick={() => handleAmountClick(amt)}
              >
                ₹{amt}
              </Button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <Button
          type="primary"
          block
          size="large"
          className="bg-[#0c3b73] rounded-lg mt-2"
          onClick={handleSubmit}
        >
          Proceed to Pay
        </Button>

      </div>
    </Modal>

    // <Modal
    //   open={isModalOpen}
    //   onCancel={() => setIsModalOpen(false)}
    //   footer={null}
    //   centered
    //   width={350}
    //   title="Pay Fee"
    // >
    //   <div className="space-y-4">
    //     <div>
    //       <label className="text-sm font-medium text-gray-600">Amount</label>
    //       <Input
    //         prefix={<IndianRupee size={16} />}
    //         placeholder="Enter amount"
    //         value={amount}
    //         type="number"
    //         min={0}
    //         onKeyDown={(e) => {
    //           if (e.key === '-' || e.key === 'e') {
    //             e.preventDefault()
    //           }
    //         }}
    //         onChange={(e) => {
    //           const value = e.target.value
    //           if (Number(value) < 0) return
    //           setAmount(value)
    //         }}
    //       />
    //     </div>

    //     <Button type="primary" block className="bg-[#0c3b73]" onClick={handleSubmit}>
    //       Proceed to Pay
    //     </Button>
    //   </div>
    // </Modal>
  )
}

const StudentFeeCollection = () => {
  const { user } = useContext(AppContext)

  const studentId = user?.profile?.userId
  const sessionId = user?.profile?.session?._id
  const classId = user?.profile?.currentClass?._id
  const className = user?.profile?.currentClass?.name
  const streamId = user?.profile?.stream?._id

  const [ledgerData, setLedgerData] = useState([])
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [showRazorpay, setShowRazorpay] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const [showMonthModal, setShowMonthModal] = useState(false)
  const [selectedMonthLedger, setSelectedMonthLedger] = useState(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null)
  const handlePayNow = async (amount) => {
    try {
      setPaymentLoading(true)

      const payload = {
        sessionId,
        studentId,
        classId,
        streamId: isSeniorClass ? streamId : null,
        amount: Number(amount), // 👈 modal se aaya amount
      }

      const res = await postRequest({
        url: 'payments/create-order',
        cred: payload,
      })

      const order = res?.data?.data
      if (!order?.orderId) throw new Error('Order creation failed')

      setOrderData(order)
      setShowRazorpay(true)
      setIsModalOpen(false)
    } catch (err) {
      alert('Unable to start payment')
    } finally {
      setPaymentLoading(false)
    }
  }

  /* ---------- Senior Class Check ---------- */
  const isSeniorClass = useMemo(() => {
    if (!className) return false
    const match = className.match(/\d+/)
    return match && Number(match[0]) >= 9
  }, [className])

  /* ---------- FETCH LEDGER ---------- */
  useEffect(() => {
    if (!studentId || !sessionId || !classId) return

    let url = `student-fees/ledger?sessionId=${sessionId}&classId=${classId}&studentId=${studentId}`

    if (isSeniorClass && streamId) {
      url += `&streamId=${streamId}`
    }
    setLoading(true)
    getRequest(url)
      .then((res) => {
        const data = res.data?.data
        if (!data?.ledger) {
          setLedgerData([])
          return
        }

        setStudentData(data.student)

        setLedgerData(data.ledger || [])
      })
      .catch(() => setLedgerData([]))
      .finally(() => setLoading(false))
  }, [studentId, sessionId, classId, streamId, isSeniorClass])

  const paginatedData = ledgerData.slice((page - 1) * limit, page * limit)
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN')
  }

  const overallTotalAmount = ledgerData.reduce((sum, month) => sum + month.totalAmount, 0)

  const overallTotalPaid = ledgerData.reduce((sum, month) => sum + month.totalPaid, 0)

  const overallTotalDue = ledgerData.reduce((sum, month) => sum + month.totalDue, 0)

  const handlePrintInvoice = (month) => {
  const printWindow = window.open('', '_blank', 'width=900,height=1000')

  printWindow.document.write(`
<html>
<head>
<meta charset="UTF-8" />
<title>Fee Payment Invoice</title>

<style>
@page {
  size: A4;
  margin: 10mm;
}

body {
  font-family: Arial, sans-serif;
  width: 210mm;
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

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
</head>

<body>

<div class="container">

  <div class="header">
    <h2>YOUR SCHOOL NAME HERE</h2>
    <div>School Address Here (Affiliated to CBSE)</div>
  </div>

  <h3 style="text-align:center; margin-top:10px;">
    FEE PAYMENT REPORT - ${month.period}
  </h3>

  <table>
    <thead>
      <tr>
        <th>Sr</th>
        <th>Fee Head</th>
        <th>Due Date</th>
        <th>Total</th>
        <th>Paid</th>
        <th>Balance</th>
      </tr>
    </thead>

    <tbody>

      ${month.items
        .map(
          (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.feeHead}</td>
          <td>${new Date(item.dueDate).toLocaleDateString('en-GB')}</td>
          <td>₹${item.totalAmount}</td>
          <td style="color:green;">₹${item.paidAmount}</td>
          <td style="color:red;">₹${item.dueAmount}</td>
        </tr>
      `
        )
        .join('')}

      <tr class="total-row">
        <td colspan="3">Grand Total</td>
        <td>₹${month.totalAmount}</td>
        <td>₹${month.totalPaid}</td>
        <td>₹${month.totalDue}</td>
      </tr>

    </tbody>
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

  printWindow.document.close()
}


  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-white border flex items-center justify-between rounded-lg px-4 py-3 mb-4">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="text-red-600" />
            Fee Payment
          </h1>
          <p className="text-sm text-gray-500">View your fee payment details</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0c3b73] text-white px-4 py-2 hover:bg-blue-800 flex items-center justify-center rounded-md text-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Pay Now
        </button>
      </div>

      {/* STUDENT SUMMARY CARD */}
      <FeeSummaryStats ledgerData={ledgerData} loading={loading} />

      {/* LOADING */}
      {loading ? (
        <div className="bg-white border rounded-lg p-10 text-center">
          <Loader />
          <p className="mt-3 text-gray-500">Loading fee details...</p>
        </div>
      ) : ledgerData.length === 0 ? (
        <div className="bg-white border rounded-lg p-10">
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
                  'Total Amount',
                  'Paid Amount',
                  'Due Amount',
                  'Status',
                  'Invoice',
                  'Action',
                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-center text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((month, i) => {
                const status =
                  month.totalDue === 0 ? 'PAID' : month.totalPaid > 0 ? 'PARTIAL' : 'DUE'

                const statusColor =
                  status === 'PAID'
                    ? 'bg-green-100 text-green-700'
                    : status === 'PARTIAL'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'

                return (
                  <tr key={month.period} className="border-b hover:bg-gray-50">
                    <td className="text-center py-2">{(page - 1) * limit + i + 1}</td>
                    <td className="text-center font-semibold">{month.period}</td>
                    <td className="text-center">₹{month.totalAmount}</td>
                    <td className="text-center text-green-600">₹{month.totalPaid}</td>
                    <td className="text-center text-red-600">₹{month.totalDue}</td>

                    <td className="text-center">
                      <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>{status}</span>
                    </td>
                    <td className="text-center">
                      <Button
                        size="small"
                        type="link"
                        title="Fee Receipt"
                        onClick={() => {
                          setSelectedInvoiceData(month)
                          setShowInvoiceModal(true)
                        }}
                      >
                        Download
                      </Button>
                    </td>

                    <td className="text-center">
                      <Button
                        size="small"
                        type="link"
                        onClick={() => {
                          setSelectedMonthLedger(month)
                          setShowMonthModal(true)
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="p-4 flex justify-end">
            <Pagination
              current={page}
              pageSize={limit}
              total={ledgerData.length}
              pageSizeOptions={['6', '12']}
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

      {/* PAYMENT MODAL */}
      {isModalOpen && (
        <FeePaymentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onPay={(amount) => handlePayNow(amount)}
        />
      )}

      <Modal
        open={showMonthModal}
        onCancel={() => setShowMonthModal(false)}
        footer={null}
        centered
        width={700}
        destroyOnHidden
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

      {showInvoiceModal && selectedInvoiceData && (
        <Modal
          open={showInvoiceModal}
          onCancel={() => setShowInvoiceModal(false)}
          footer={null}
          width={900}
          centered
          destroyOnClose
        >
          <MonthlyInvoice student={studentData} monthLedger={selectedInvoiceData} />
        </Modal>
      )}

      {showRazorpay && orderData && (
        <RenderRazorPay
          orderId={orderData.orderId}
          currency={orderData.currency || 'INR'}
          amount={orderData.amount} // paise me
          setUpdateStatus={async (paymentResponse) => {
            console.log('Payment Response', paymentResponse)

            // 🔐 VERIFY PAYMENT
            await postRequest({
              url: 'payments/verify-payment',
              cred: {
                gatewayOrderId: paymentResponse.razorpay_order_id,
                gatewayPaymentId: paymentResponse.razorpay_payment_id,
                gatewaySignature: paymentResponse.razorpay_signature,
              },
            })
            setShowRazorpay(false)
          }}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </div>
  )
}

export default StudentFeeCollection
