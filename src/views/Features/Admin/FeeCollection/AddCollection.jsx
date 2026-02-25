import React, { useContext, useState } from 'react'
import { Modal } from 'antd'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { postRequest } from '../../../../Helpers'
import { AppContext } from '../../../../Context/AppContext'

const FeePaymentModal = ({ isModalOpen, setIsModalOpen, studentData, setUpdateStatus }) => {

  const { user } = useContext(AppContext)
  console.log("user>>>>", user)


  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState('Cash')
  const [loading, setLoading] = useState(false)
  const userId = user?.user?._id
  console.log("userid===>>>", userId)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      clerkId: userId,
      sessionId: studentData.sessionId,
      studentId: studentData.studentId,
      classId: studentData.classId,
      streamId: studentData.streamId,
      amountPaid: Number(amount),
      paymentMode: mode.toUpperCase(),
    }

    try {
      setLoading(true)
      console.log("payload>>>>>>>>>=====", payload)
      const res = await postRequest({
        url: 'student-fees/collect',
        cred: payload,
      })

      if (res?.status === 200 || res?.status === 201) {
        toast.success('Fee collected successfully')
        setUpdateStatus((p) => !p)
        setIsModalOpen(false)
      } else {
        toast.error('Failed to collect fee')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to collect fee')
    } finally {
      setLoading(false)
    }

  }

  return (
    <Modal
      open={isModalOpen}
      title="Collect Fee"
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <div className="bg-blue-50 p-3 rounded mb-3 text-sm">
        <b>{studentData.name}</b>
        <div>Class: {studentData.className}</div>
        <div>Section: {studentData.sectionName}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Amount</label>
        <div className="input-group mb-3">
          <span className="input-group-text">₹</span>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <label>Payment Mode</label>
        <select
          className="form-select mb-3"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
          <option value="Online">Online</option>
        </select>

        <div className="text-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0c3b73] text-white px-4 py-1 rounded"
          >
            {loading ? 'Saving...' : 'Collect Fee'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FeePaymentModal
