/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getRequest, postRequest, putRequest } from '../../../../Helpers'
import { useContext } from 'react'
import { SessionContext } from '../../../../Context/Seesion.js'

const ExamListsModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  setUpdateStatus,
}) => {
  const { currentSession } = useContext(SessionContext)
  const [formData, setFormData] = useState({
    examMasterId: '',
    classId: '',
    sessionId: currentSession?._id,
    fromDate: '',
    toDate: '',
    remarks: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [exams, setExams] = useState([])

  console.log('exams', exams)
  const [classes, setClasses] = useState([])
  /* ---------------- APIs ---------------- */
  useEffect(() => {
    getRequest(`exams?isPagination=false`).then((res) => {
      setExams(res?.data?.data?.exams || [])
    })
  }, [])

  useEffect(() => {
    if (!currentSession?._id) return
    getRequest(`classes?isPagiantion=false&limit=100&session=${currentSession?._id}`)
      .then((res) => {
        console.log('class', res)

        setClasses(res?.data?.data?.classes || [])
      })
      .catch(() => toast.error('Failed to fetch classes'))
  }, [currentSession?._id])

  /* ---------------- Prefill (Edit) ---------------- */
  useEffect(() => {
    if (!modalData) return
    setFormData({
      examMasterId: modalData.examMaster?._id || '',
      classId: modalData.class?._id || '',
      fromDate: modalData.fromDate?.slice(0, 10) || '',
      toDate: modalData.toDate?.slice(0, 10) || '',
      remarks: modalData.remarks || '',
    })
  }, [modalData])

  /* ---------------- Helpers ---------------- */
  const isSeniorClass = () => {
    const cls = classes.find((c) => c._id === formData.classId)
    const num = Number(cls?.className)
    return num >= 9 && num <= 12
  }

  const handleCancel = () => {
    setFormData({
      examMasterId: '',
      classId: '',
      fromDate: '',
      toDate: '',
      remarks: '',
    })
    setErrors({})
    setModalData(null)
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const err = {}
    if (!formData.examMasterId) err.examMasterId = 'Exam is required'
    if (!formData.classId) err.classId = 'Class is required'
    if (!formData.fromDate) err.fromDate = 'From date required'
    if (!formData.toDate) err.toDate = 'To date required'
    if (isSeniorClass() && !formData.streamId) err.streamId = 'Stream is required'

    setErrors(err)
    return Object.keys(err).length === 0
  }

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    if (!currentSession?._id) {
      toast.error('Active session not found')
      return
    }
    setLoading(true)

    const payload = {
      ...formData,
      sessionId: currentSession._id,
    }

    const apiCall = modalData
      ? putRequest({ url: `examsList/${modalData._id}`, cred: payload })
      : postRequest({ url: 'examsList', cred: payload })

    apiCall
      .then((res) => {
        toast.success(res?.data?.message || 'Saved successfully')
        setUpdateStatus((prev) => !prev)
        handleCancel()
      })
      .catch((err) => toast.error(err?.response?.data?.message || 'Something went wrong'))
      .finally(() => setLoading(false))
  }

  /* ---------------- UI ---------------- */
  return (
    <Modal
      title={modalData ? 'Edit Exam Schedule' : 'Add Exam Schedule'}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit}>
        {/* Exam */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Exam<span className="text-danger">*</span>
          </label>
          <select
            name="examMasterId"
            className={`form-select ${errors.examMasterId ? 'is-invalid' : ''}`}
            value={formData.examMasterId}
            onChange={handleChange}
          >
            <option value="">Select Exam</option>
            {exams.map((e) => (
              <option key={e._id} value={e._id}>
                {e.examName}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Class<span className="text-danger">*</span>
          </label>
          <select
            name="classId"
            className={`form-select ${errors.classId ? 'is-invalid' : ''}`}
            value={formData.classId}
            onChange={handleChange}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">
              From Date<span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="fromDate"
              className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
              value={formData.fromDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">
              To Date<span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="toDate"
              className={`form-control ${errors.toDate ? 'is-invalid' : ''}`}
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ExamListsModal
