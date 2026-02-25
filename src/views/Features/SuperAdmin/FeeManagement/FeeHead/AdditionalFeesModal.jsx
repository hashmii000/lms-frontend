import React, { useContext, useEffect, useState } from 'react'
import { Modal, Select, Input, DatePicker, Row, Col } from 'antd'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { getRequest, postRequest, putRequest } from '../../../../../Helpers'
import { SessionContext } from '../../../../../Context/Seesion'

const { Option } = Select

const PERIODS = [
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
  'JANUARY',
  'FEBRUARY',
  'MARCH',
]

const AdditionalFeesModal = ({ open, onClose, refresh, editData }) => {
  const { currentSession } = useContext(SessionContext)

  const getSessionYearByPeriod = (period) => {
    if (!period) return null

    const monthMap = {
      APRIL: 3,
      MAY: 4,
      JUNE: 5,
      JULY: 6,
      AUGUST: 7,
      SEPTEMBER: 8,
      OCTOBER: 9,
      NOVEMBER: 10,
      DECEMBER: 11,
      JANUARY: 0,
      FEBRUARY: 1,
      MARCH: 2,
    }

    let year

    // 🔥 Jan–Feb–March → next year (2027)
    if (['JANUARY', 'FEBRUARY', 'MARCH'].includes(period)) {
      year = 2027
    } else {
      // 🔹 April–Dec → session start year
      if (!currentSession?.name) return null
      year = Number(currentSession.name.split('-')[0])
    }

    return dayjs().year(year).month(monthMap[period]).date(1)
  }

  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [streams, setStreams] = useState([])

  // const [formData, setFormData] = useState({
  //   sessionId: '',
  //   classId: '',
  //   streamId: null,
  //   feeName: '',
  //   feeType: 'ONE_TIME',
  //   period: '',
  //   amount: '',
  //   dueDate: null,
  // })
  const [formData, setFormData] = useState({
    sessionId: '',
    classId: null, // 🔥 default ALL
    streamId: null,
    feeName: '',
    feeType: 'ONE_TIME',
    period: '',
    amount: '',
    dueDate: null,
  })

  /* ================= FETCH CLASSES ================= */
  useEffect(() => {
    if (!currentSession?._id) return
    getRequest(`classes?isPagination=false&session=${currentSession._id}`).then((res) => {
      setClasses(res?.data?.data?.classes || [])
    })
  }, [currentSession])

  /* ================= FETCH STREAMS ================= */
  useEffect(() => {
    if (!formData.classId) {
      setStreams([])
      return
    }

    const cls = classes.find((c) => c._id === formData.classId)

    if (!cls?.isSenior) {
      setStreams([])
      return
    }

    getRequest(`streams?classId=${formData.classId}&isPagination=false`)
      .then((res) => {
        setStreams(res?.data?.data?.streams || [])
      })
      .catch(() => toast.error('Failed to load streams'))
  }, [formData.classId, classes])

  /* ================= AUTO SESSION ================= */
  useEffect(() => {
    if (currentSession?._id) {
      setFormData((p) => ({ ...p, sessionId: currentSession._id }))
    }
  }, [currentSession])

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (!editData) return

    setFormData({
      sessionId: editData.sessionId?._id || editData.sessionId,
      classId: editData.classId?._id || editData.classId,
      streamId: editData.streamId?._id || editData.streamId || null,
      feeName: editData.feeName || '',
      feeType: 'ONE_TIME',
      period: editData.period || '',
      amount: editData.amount || '',
      dueDate: editData.dueDate ? dayjs(editData.dueDate) : null,
    })
  }, [editData])

  /* ================= CHECK SENIOR ================= */

  const selectedClass = classes.find((c) => c._id === formData.classId)
  const isStreamAllowed = selectedClass?.isSenior || false

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (
      !formData.sessionId ||
      // !formData.classId ||
      !formData.feeName ||
      !formData.amount ||
      !formData.period ||
      !formData.dueDate
    ) {
      toast.error('All required fields are mandatory')
      return
    }

    // const payload = {
    //   sessionId: formData.sessionId,
    //   classId: formData.classId,
    //   streamId: formData.streamId,
    //   feeName: formData.feeName,
    //   feeType: 'ONE_TIME',
    //   period: formData.period,
    //   amount: Number(formData.amount),
    //   dueDate: formData.dueDate.format('YYYY-MM-DD'),
    // }
    const payload = {
      sessionId: formData.sessionId,
      classId: formData.classId,
      streamId: formData.streamId,
      feeName: formData.feeName,
      feeType: 'ONE_TIME',
      period: formData.period,
      amount: Number(formData.amount),
      dueDate: formData.dueDate.format('YYYY-MM-DD'),
    }

    setLoading(true)
    try {
      if (editData?._id) {
        await putRequest({
          url: `additional-fees/${editData._id}`,
          cred: payload,
        })
        toast.success('Fee Updated Successfully')
      } else {
        await postRequest({
          url: 'additional-fees',
          cred: payload,
        })
        toast.success('Fee Added Successfully')
      }

      refresh()
      onClose()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      title={editData ? 'Edit Additional Fee' : 'Add Additional Fee'}
      width={650}
      okText={editData ? 'Update' : 'Save'}
      okButtonProps={{
        className: 'px-4 py-2 border rounded',
        style: { backgroundColor: '#0c3b73', color: '#fff' },
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <label className="mt-2">
            Class<span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select Class"
            value={formData.classId === null ? 'ALL' : formData.classId}
            className="w-100"
            onChange={(v) => {
              const value = v === 'ALL' ? null : v
              const cls = classes.find((c) => c._id === value)

              setFormData((p) => ({
                ...p,
                classId: value,
                streamId: cls?.isSenior ? p.streamId : null,
              }))
            }}
          >
            <Option value="ALL">All</Option>

            {classes.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Col>

        {isStreamAllowed && (
          <Col span={12}>
            Stream
            <Select
              value={formData.streamId}
              className="w-100"
              placeholder="Enter Stream"
              onChange={(v) => setFormData((p) => ({ ...p, streamId: v }))}
            >
              {streams.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        <Col span={12}>
          <label className="mt-2">
            Fee Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.feeName}
            placeholder=" Fee Name"
            onChange={(e) => setFormData((p) => ({ ...p, feeName: e.target.value }))}
          />
        </Col>

        <Col span={12}>
          <label className="mt-2">
            Amount <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={(e) => setFormData((p) => ({ ...p, amount: e.target.value }))}
          />
        </Col>

        <Col span={12}>
          <label className="mt-2">
            Period <span className="text-red-500">*</span>{' '}
          </label>
          <Select
            placeholder="Select the Period"
            value={formData.period || undefined}
            className="w-100"
            onChange={(v) => {
              const baseDate = getSessionYearByPeriod(v)

              setFormData((p) => ({
                ...p,
                period: v,
                dueDate: baseDate, // ✅ THIS IS THE KEY
              }))
            }}
          >
            {PERIODS.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={12}>
          <label className="mt-2">
            Due Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            className="w-100"
            format="DD/MM/YYYY"
            placeholder="Select the Date"
            value={formData.dueDate}
            onChange={(d) =>
              setFormData((p) => ({
                ...p,
                dueDate: d,
              }))
            }
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default AdditionalFeesModal
