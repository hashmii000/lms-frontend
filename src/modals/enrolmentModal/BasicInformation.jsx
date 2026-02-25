import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react'
import { DatePicker, Modal, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { fileUpload, getRequest } from '../../Helpers/index.js'
import dayjs from 'dayjs'

const BasicInformation = forwardRef(({ modalData, onChange }, ref) => {
  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    formNo: '',
    studentId: '',
    studentRegistrationId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    gender: '',
    dob: '',
    category: '',
    religion: '',
    fatherName: '',
    motherName: '',

    handicapped: '',
    income: '',
    presentAddress1: '',
    presentAddress2: '',
    presentCity: '',
    fatherOccupation: '',
    motherOccupation: '',
    profilePic: '',
    presentState: '',
    presentPin: '',
    presentMobile: '',
    presentEmail: '',
    permanentAddress1: '',
    permanentAddress2: '',
    permanentCity: '',
    permanentState: '',
    permanentPin: '',
    permanentMobile: '',
    permanentEmail: '',
    currentClass: '', // ✅ ADDED
  })

  const [allFormNoResults, setAllFormNoResults] = useState([])
  const [isSelectingFormNo, setIsSelectingFormNo] = useState(false)
  const [errors, setErrors] = useState({})
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [formNoResults, setFormNoResults] = useState([])
  const [showFormNoDropdown, setShowFormNoDropdown] = useState(false)
  const [uploadingProfile, setUploadingProfile] = useState(false)
  const isEditMode = Boolean(modalData?._id || modalData?.studentRegistrationId)
  const formNoRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formNoRef.current && !formNoRef.current.contains(event.target)) {
        setShowFormNoDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /* ================= FORM NO SELECT ================= */
  const handleFormNoSelect = (student) => {
    console.log('🟡 Selected Student:', student)
    console.log('🟡 expectedClass:', student.expectedClass)
    setIsSelectingFormNo(true)

    setFormData((prev) => ({
      ...prev,
      formNo: student.formNo || '',
      studentRegistrationId: student._id || '',
      studentId: student.studentId || '',
      firstName: student.firstName || '',
      middleName: student.middleName || '',
      lastName: student.lastName || '',
      fatherName: student.fatherName || '',
      gender: student.gender
        ? student.gender.charAt(0) + student.gender.slice(1).toLowerCase()
        : '',

      phone: student.phone || '',
      presentAddress1: student.address || '',
      presentCity: student.city || '',
      currentClass: student.currentClass?._id || '',
      // ✅ CRITICAL FIX
    }))

    setShowFormNoDropdown(false)
    setTimeout(() => setIsSelectingFormNo(false), 300)
  }

  /* ================= FORM NO CHANGE ================= */
  const handleFormNoChange = async (e) => {
    if (isSelectingFormNo) return

    const value = e?.target?.value || ''
    setFormData((prev) => ({ ...prev, formNo: value }))

    try {
      if (allFormNoResults.length === 0) {
        const res = await getRequest('studentRegistrations?isPagination=false&isEnroll=false')
        const list = Array.isArray(res?.data?.data?.students) ? res.data.data.students : []
        setAllFormNoResults(list)
        setFormNoResults(list)
        setShowFormNoDropdown(true)
        return
      }

      if (!value) {
        setFormNoResults(allFormNoResults)
      } else {
        const search = value.toLowerCase()
        setFormNoResults(
          allFormNoResults.filter(
            (s) =>
              String(s.formNo || '')
                .toLowerCase()
                .includes(search) ||
              s.firstName?.toLowerCase().includes(search) ||
              s.lastName?.toLowerCase().includes(search),
          ),
        )
      }

      setShowFormNoDropdown(true)
    } catch (err) {
      setFormNoResults([])
      setShowFormNoDropdown(false)
    }
  }

  /* ================= PREFILL (EDIT MODE) ================= */
  useEffect(() => {
    if (!modalData) return

    setFormData((prev) => ({
      ...prev,
      formNo: modalData.formNo || '',
      studentId: modalData.studentId || '',
      studentRegistrationId: modalData.studentRegistrationId || modalData._id || '',
      phone: modalData.phone || '',
      firstName: modalData.firstName || '',
      middleName: modalData.middleName || '',
      lastName: modalData.lastName || '',
      gender: modalData.gender || '',
      dob: modalData.dob ? dayjs(modalData.dob, ['DD-MM-YYYY', 'YYYY-MM-DD']).toISOString() : '',
      category: modalData.category || '',
      religion: modalData.religion || '',
      handicapped: modalData.handicapped || '',
      income: modalData.income || '',
      fatherName: modalData.fatherName || '',
      motherName: modalData.motherName || '',
      fatherOccupation: modalData.fatherOccupation || '',
      motherOccupation: modalData.motherOccupation || '',

      // ✅ THIS IS THE KEY FIX
      profilePic: modalData.profilePic || '',

      presentAddress1: modalData.address?.present?.Address1 || '',
      presentAddress2: modalData.address?.present?.Address2 || '',
      presentCity: modalData.address?.present?.City || '',
      presentState: modalData.address?.present?.State || '',
      presentPin: modalData.address?.present?.Pin || '',
      presentMobile: modalData.address?.present?.Mobile || '',
      presentEmail: modalData.address?.present?.Email || '',

      permanentAddress1: modalData.address?.permanent?.Address1 || '',
      permanentAddress2: modalData.address?.permanent?.Address2 || '',
      permanentCity: modalData.address?.permanent?.City || '',
      permanentState: modalData.address?.permanent?.State || '',
      permanentPin: modalData.address?.permanent?.Pin || '',
      permanentMobile: modalData.address?.permanent?.Mobile || '',
      permanentEmail: modalData.address?.permanent?.Email || '',

      currentClass: modalData.currentClass?._id || modalData.currentClass || '',
    }))

    // Upload preview ke liye
    if (modalData.profilePic) {
      setFileList([
        {
          uid: '-1',
          name: 'profile.jpg',
          status: 'done',
          url: modalData.profilePic,
        },
      ])
    }
  }, [modalData])

  /* ================= PROPAGATE TO PARENT ================= */
  useEffect(() => {
    onChange?.(formData)
  }, [formData, onChange])

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: value ? '' : prev[name] }))
  }

  const renderError = (field) =>
    errors[field] && <small className="text-danger">{errors[field]}</small>

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    if (!newFileList.length) return

    const file = newFileList[0].originFileObj

    // 👇 Edit mode me existing image case
    if (!file) return

    const fd = new FormData()
    fd.append('file', file)

    fileUpload({ url: 'upload/uploadImage', cred: fd }).then((res) => {
      const url = res?.data?.data?.imageUrl
      if (url) {
        setFormData((prev) => ({
          ...prev,
          profilePic: url, // ✅ overwrite only when new upload
        }))

        setFileList([
          {
            uid: '-1',
            name: 'profile.jpg',
            status: 'done',
            url,
          },
        ])
      }
    })
  }

  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl || file.url)
    setIsPreviewVisible(true)
  }

  const handleCancel = () => setIsPreviewVisible(false)

  const handleSameAddress = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress1: prev.presentAddress1,
        permanentAddress2: prev.presentAddress2,
        permanentCity: prev.presentCity,
        permanentState: prev.presentState,
        permanentPin: prev.presentPin,
        permanentMobile: prev.presentMobile,
        permanentEmail: prev.presentEmail,
      }))
    }
  }

  /* ================= VALIDATION ================= */
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      const err = {}

      if (!formData.formNo) err.formNo = 'Required'
      if (!formData.firstName) err.firstName = 'Required'
      if (!formData.gender) err.gender = 'Required'
      if (!formData.dob) err.dob = 'Required'
      if (!formData.phone) err.phone = 'Required'
      if (!formData.presentAddress1) err.presentAddress1 = 'Required'
      if (!formData.presentCity) err.presentCity = 'Required'
      if (!formData.presentState) err.presentState = 'Required'
      if (!formData.presentPin) err.presentPin = 'Required'
      if (!formData.permanentAddress1) err.permanentAddress1 = 'Required'
      if (!formData.permanentCity) err.permanentCity = 'Required'
      if (!formData.permanentState) err.permanentState = 'Required'
      if (!formData.permanentPin) err.permanentPin = 'Required'

      setErrors(err)

      return {
        valid: Object.keys(err).length === 0,
        data: {
          formNo: formData.formNo,
          studentId: formData.studentId,
          studentRegistrationId: formData.studentRegistrationId,
          phone: formData.phone,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          gender: formData.gender,
          dob: formData.dob,
          category: formData.category ? formData.category.toUpperCase() : '',
          religion: formData.religion,
          handicapped: formData.handicapped,
          income: formData.income,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          fatherOccupation: formData.fatherOccupation,
          motherOccupation: formData.motherOccupation,

          // profilePic: photoUrl,
          profilePic: formData.profilePic,

          address: {
            present: {
              Address1: formData.presentAddress1,
              Address2: formData.presentAddress2,
              City: formData.presentCity,
              State: formData.presentState,
              Pin: formData.presentPin,
              Mobile: formData.presentMobile,
              Email: formData.presentEmail,
            },
            permanent: {
              Address1: formData.permanentAddress1,
              Address2: formData.permanentAddress2,
              City: formData.permanentCity,
              State: formData.permanentState,
              Pin: formData.permanentPin,
              Mobile: formData.permanentMobile,
              Email: formData.permanentEmail,
            },
          },

          currentClass: formData.currentClass, // ✅ PASS TO PAYLOAD
        },
      }
    },
  }))

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <form className="container mt-3">
      {/* ================= BASIC IDs ================= */}
      <div className="row g-3">
        {/* LEFT : BASIC IDs */}
        <div className="col-md-6 col-12">
          <div className="card mb-3">
            <div className="card-header !bg-[#0c3b73] text-white">Basic ID's</div>

            <div className="card-body">
              {/* Form No */}
              <div className="mb-3 position-relative" ref={formNoRef}>
                <label className="form-label">
                  Form No. <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="formNo"
                  value={formData.formNo}
                  onChange={isEditMode ? undefined : handleFormNoChange}
                  onFocus={isEditMode ? undefined : handleFormNoChange}
                  autoComplete="off"
                  className={`form-control form-control-sm ${
                    isEditMode ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="Search Using Form No."
                  disabled={isEditMode}
                />

                {renderError('formNo')}

                {showFormNoDropdown && !isEditMode && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      background: '#fff',
                      border: '1px solid #ddd',
                      zIndex: 99999,
                      maxHeight: 220,
                      overflowY: 'auto',
                    }}
                  >
                    {formNoResults.length === 0 && (
                      <div style={{ padding: 8, color: '#999' }}>No records found</div>
                    )}

                    {formNoResults.map((s) => (
                      <div
                        key={s._id}
                        style={{ padding: '6px 10px', cursor: 'pointer' }}
                        onClick={() => handleFormNoSelect(s)}
                        className="border b hover:bg-blue-50"
                      >
                        <div className="flex flex-col ">
                          <span className="font-medium">
                            {s.firstName} {s.lastName}
                            <span className="text-xs text-gray-500 ml-2">({s.formNo})</span>
                          </span>
                          {s.fatherName && (
                            <span className="text-xs text-gray-600">{s.fatherName}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Student ID */}
              <div>
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control form-control-sm cursor-not-allowed opacity-60"
                  value={formData.studentId}
                  disabled
                />
                {renderError('studentId')}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT : PHOTOGRAPH */}
        <div className="col-md-6 col-12">
          <div className="card mb-3 h-53">
            <div className="card-header !bg-[#0c3b73] text-white">Photograph</div>

            <div className="card-body d-flex justify-content-center align-items-center">
              <Upload
                listType="picture-card"
                className="profile-upload"
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={handlePreview}
                onRemove={() => {
                  // 🔥 PERMANENT DELETE
                  setFileList([])
                  setFormData((prev) => ({
                    ...prev,
                    profilePic: '', // ✅ clear from payload
                  }))
                }}
                beforeUpload={() => false}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BASIC INFO + PHOTO ================= */}
      <div className="row g-3">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header !bg-[#0c3b73] text-white">Basic Information</div>
            <div className="card-body">
              <div className="row g-3">
                {/* First Name */}
                <div className="col-md-4 col-12">
                  <label htmlFor="firstName" className="form-label">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                  />
                  {renderError('firstName')}
                </div>

                {/* Middle Name */}
                <div className="col-md-4 col-12">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter Middle Name"
                  />
                  {renderError('middleName')}
                </div>

                {/* Last Name */}
                <div className="col-md-4 col-12">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                  />
                  {renderError('lastName')}
                </div>

                {/* Gender */}
                {/* Gender */}
                {/* Gender */}
                <div className="col-md-4 col-12">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    className={`form-select form-select-sm ${errors.gender ? 'border-danger' : ''}`}
                    value={formData.gender}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData((prev) => ({ ...prev, gender: value }))
                      if (value) {
                        setErrors((prev) => ({ ...prev, gender: '' })) // ✅ Error clear
                      }
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Female">Other</option>
                  </select>

                  {renderError('gender')}
                </div>

                {/* Date of Birth */}
                <div className="col-md-4 col-12">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth <span className="text-danger">*</span>
                  </label>

                  <DatePicker
                    className="form-control form-control-sm w-100"
                    format="DD/MM/YYYY"
                    value={formData.dob ? dayjs(formData.dob) : null}
                    onChange={(date) => {
                      setFormData((prev) => ({
                        ...prev,
                        dob: date ? date.toISOString() : '', // ✅ BACKEND SAFE
                      }))
                      setErrors((prev) => ({ ...prev, dob: '' }))
                    }}
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />

                  {renderError('dob')}
                </div>

                {/* Category */}
                <div className="col-md-4 col-12">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select form-select-sm"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="GENERAL">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                  {renderError('category')}
                </div>

                {/* phone */}
                <div className="col-md-4 col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '') // only digits
                      if (value.length <= 10) {
                        setFormData((prev) => ({ ...prev, phone: value }))
                      }
                    }}
                    placeholder="Enter 10-digit Mobile Number"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    title="Mobile number must be 10 digits"
                    required
                  />
                </div>

                {/* Religion */}
                <div className="col-md-4 col-12">
                  <label htmlFor="religion" className="form-label">
                    Religion
                  </label>

                  <select
                    id="religion"
                    name="religion"
                    className="form-select form-select-sm"
                    value={formData.religion}
                    onChange={handleChange}
                  >
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Christian">Christian</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Jain">Jain</option>
                    <option value="Parsi">Parsi (Zoroastrian)</option>
                    <option value="Jewish">Jewish</option>
                    <option value="Bahai">Bahai</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Father's Name */}
                <div className="col-md-4 col-12">
                  <label htmlFor="fatherName" className="form-label">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter Father's Name"
                    required
                  />
                  {renderError('fatherName')}
                </div>

                {/* Father Occupation */}
                <div className="col-md-4 col-12">
                  <label htmlFor="occupation" className="form-label">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="fatherOccupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    placeholder="Enter Father's Occupation"
                  />
                </div>

                {/* Mother's Name */}
                <div className="col-md-4 col-12">
                  <label htmlFor="motherName" className="form-label">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter Mother's Name"
                  />
                  {renderError('motherName')}
                </div>

                {/* Mother Occupation */}
                <div className="col-md-4 col-12">
                  <label htmlFor="motheroccupation" className="form-label">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="motherOccupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    placeholder="Enter Mother's Occupation"
                  />
                </div>

                {/* Handicapped */}
                <div className="col-md-4 col-12">
                  <label htmlFor="handicapped" className="form-label">
                    Handicapped
                  </label>
                  <select
                    id="handicapped"
                    name="handicapped"
                    className="form-select form-select-sm"
                    value={formData.handicapped || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Annual Income */}
                <div className="col-md-4 col-12">
                  <label htmlFor="income" className="form-label">
                    Family Annual Income
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="income"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="Enter Annual Income"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ADDRESS ================= */}
      <div className="row g-3">
        {/* Present Address */}
        <div className="col-md-6 col-12">
          <div className="card mb-3">
            <div className="card-header !bg-[#0c3b73] text-white">Present Address</div>
            <div className="card-body">
              {/* Address 1 */}
              <div className="mb-2">
                <label htmlFor="presentAddress1" className="form-label">
                  Address 1 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="presentAddress1"
                  name="presentAddress1"
                  value={formData.presentAddress1}
                  onChange={handleChange}
                  placeholder="Enter Address 1"
                />
                {renderError('presentAddress1')}
              </div>

              {/* Address 2 */}
              <div className="mb-2">
                <label htmlFor="presentAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="presentAddress2"
                  name="presentAddress2"
                  value={formData.presentAddress2}
                  onChange={handleChange}
                  placeholder="Enter Address 2"
                />
                {renderError('presentAddress2')}
              </div>

              {/* City & State */}
              <div className="row g-2">
                <div className="col-6">
                  <label htmlFor="presentCity" className="form-label">
                    City/District <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="presentCity"
                    name="presentCity"
                    value={formData.presentCity}
                    onChange={handleChange}
                    placeholder="Enter City/District"
                  />
                  {renderError('presentCity')}
                </div>
                <div className="col-6">
                  <label htmlFor="presentState" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="presentState"
                    name="presentState"
                    value={formData.presentState}
                    onChange={handleChange}
                    placeholder="Enter State"
                  />
                  {renderError('presentState')}
                </div>
              </div>

              {/* Pin Code & Mobile */}
              <div className="row g-2 mt-2">
                <div className="col-6">
                  <label htmlFor="presentPin" className="form-label">
                    Pin Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="presentPin"
                    name="presentPin"
                    value={formData.presentPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '') // remove alphabets
                      if (value.length <= 6) {
                        setFormData((prev) => ({ ...prev, presentPin: value }))
                        setErrors((prev) => ({ ...prev, presentPin: '' })) // ✅
                      }
                    }}
                    placeholder="Enter Pin Code"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    title="PIN Code must be 6 digits"
                    required
                  />
                  {renderError('presentPin')}
                </div>
                <div className="col-6">
                  <label htmlFor="presentMobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="presentMobile"
                    name="presentMobile"
                    value={formData.presentMobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '') // only digits
                      if (value.length <= 10) {
                        setFormData((prev) => ({ ...prev, presentMobile: value }))
                      }
                    }}
                    placeholder="Enter 10-digit Mobile Number"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    title="Mobile number must be 10 digits"
                  />
                  {renderError('presentMobile')}
                </div>
              </div>

              {/* Email */}
              <div className="mt-2">
                <label htmlFor="presentEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="presentEmail"
                  name="presentEmail"
                  value={formData.presentEmail}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                {renderError('presentEmail')}
              </div>
            </div>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="col-md-6 col-12">
          <div className="card mb-3">
            <div className="card-header !bg-[#0c3b73] text-white">
              Permanent Address
              <div className="form-check float-end">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sameAddress"
                  onChange={handleSameAddress}
                />
                <label className="form-check-label" htmlFor="sameAddress">
                  Same Address
                </label>
              </div>
            </div>
            <div className="card-body">
              {/* Address 1 */}
              <div className="mb-2">
                <label htmlFor="permanentAddress1" className="form-label">
                  Address 1 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="permanentAddress1"
                  name="permanentAddress1"
                  value={formData.permanentAddress1}
                  onChange={handleChange}
                  placeholder="Enter Address 1"
                />
                {renderError('permanentAddress1')}
              </div>

              {/* Address 2 */}
              <div className="mb-2">
                <label htmlFor="permanentAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="permanentAddress2"
                  name="permanentAddress2"
                  value={formData.permanentAddress2}
                  onChange={handleChange}
                  placeholder="Enter Address 2"
                />
                {renderError('permanentAddress2')}
              </div>

              {/* City & State */}
              <div className="row g-2">
                <div className="col-6">
                  <label htmlFor="permanentCity" className="form-label">
                    City/District <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="permanentCity"
                    name="permanentCity"
                    value={formData.permanentCity}
                    onChange={handleChange}
                    placeholder="Enter City/District"
                  />
                  {renderError('permanentCity')}
                </div>
                <div className="col-6">
                  <label htmlFor="permanentState" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="permanentState"
                    name="permanentState"
                    value={formData.permanentState}
                    onChange={handleChange}
                    placeholder="Enter State"
                  />
                  {renderError('permanentState')}
                </div>
              </div>

              {/* Pin Code & Mobile */}
              <div className="row g-2 mt-2">
                <div className="col-6">
                  <label htmlFor="permanentPin" className="form-label">
                    Pin Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="permanentPin"
                    name="permanentPin"
                    value={formData.permanentPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 6) {
                        setFormData((prev) => ({ ...prev, permanentPin: value }))
                        setErrors((prev) => ({ ...prev, permanentPin: '' })) // ✅
                      }
                    }}
                    placeholder="Enter Pin Code"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    title="PIN Code must be 6 digits"
                    required
                  />
                  {renderError('permanentPin')}
                </div>
                <div className="col-6">
                  <label htmlFor="permanentMobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="permanentMobile"
                    name="permanentMobile"
                    value={formData.permanentMobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '') // only digits
                      if (value.length <= 10) {
                        setFormData((prev) => ({ ...prev, permanentMobile: value }))
                      }
                    }}
                    placeholder="Enter 10-digit Mobile Number"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    title="Mobile number must be 10 digits"
                  />
                  {renderError('permanentMobile')}
                </div>
              </div>

              {/* Email */}
              <div className="mt-2">
                <label htmlFor="permanentEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="permanentEmail"
                  name="permanentEmail"
                  value={formData.permanentEmail}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                {renderError('permanentEmail')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isPreviewVisible} footer={null} onCancel={handleCancel}>
        <img alt="Profile Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </form>
  )
})

export default BasicInformation
