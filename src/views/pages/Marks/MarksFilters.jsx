/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react'
import { Filter, Search } from 'lucide-react'
import { getRequest } from '../../../Helpers'
import { SessionContext } from '../../../Context/Seesion'

/* ================= INITIAL FILTERS ================= */
const initialFilters = {
  search: '',
  classId: '',
  sectionId: '',
  streamId: '',
}

const MarksFilters = ({ onApply }) => {
  const [filters, setFilters] = useState(initialFilters)

  const [examList, setExamList] = useState([])
  const [classList, setClassList] = useState([])
  const [studentList, setStudentList] = useState([])
  const [sessionList, setSessionList] = useState([])

  const [sectionList, setSectionList] = useState([])
  const [streamList, setStreamList] = useState([])

  const [isApplied, setIsApplied] = useState(false)
  const { currentSession } = useContext(SessionContext)

  /* ================= FETCH MASTER DATA ================= */

  useEffect(() => {
    getRequest('examsList?isPagination=false')
      .then((res) => setExamList(res?.data?.data?.examLists || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!currentSession?._id) return

    getRequest(`classes?session=${currentSession._id}&isPagination=false`).then((res) => {
      setClassList(res?.data?.data?.classes || [])
    })
  }, [currentSession?._id])

  useEffect(() => {
    getRequest('studentEnrollment?isPagination=false')
      .then((res) => setStudentList(res?.data?.data?.students || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    getRequest('sessions')
      .then((res) => setSessionList(res?.data?.data?.sessions || []))
      .catch(() => {})
  }, [])

  /* ================= CLASS → SECTION / STREAM ================= */

  useEffect(() => {
    if (!filters.classId) {
      setSectionList([])
      setStreamList([])
      setFilters((prev) => ({ ...prev, sectionId: '', streamId: '' }))
      return
    }

    // 🔹 Fetch sections by class
    getRequest(`sections?classId=${filters.classId}&isPagination=false`)
      .then((res) => setSectionList(res?.data?.data?.sections || []))
      .catch(() => {})

    // 🔹 Stream only for class 9–12
    const selectedClass = classList.find((c) => c._id === filters.classId)
    const seniorClasses = ['9th', '10th', '11th', '12th']

    if (seniorClasses.includes(selectedClass?.name)) {
      getRequest(`streams?classId=${filters.classId}&isPagination=false`)
        .then((res) => setStreamList(res?.data?.data?.streams || []))
        .catch(() => {})
    } else {
      setStreamList([])
      setFilters((prev) => ({ ...prev, streamId: '' }))
    }
  }, [filters.classId, classList])

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onApply && onApply(filters)
    setIsApplied(true)
  }

  const handleReset = () => {
    setFilters(initialFilters)
    setSectionList([])
    setStreamList([])
    setIsApplied(false)
    onApply && onApply(initialFilters)
  }

  const isAnyFilterApplied = Object.values(filters).some((v) => v !== '')

  /* ================= UI ================= */

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-700">Filters & Search</h3>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-end">
        {/* Search */}
        <div className="w-full xl:max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="search"
              placeholder="Name / Exam / Category"
              value={filters.search}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Class */}
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select
            name="classId"
            value={filters.classId}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="">Select Class</option>
            {classList.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Section */}
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select
            name="sectionId"
            value={filters.sectionId}
            onChange={handleChange}
            disabled={!sectionList.length}
            className="w-full border rounded-md p-2 text-sm disabled:bg-gray-100"
          >
            <option value="">Select Section</option>
            {sectionList.map((sec) => (
              <option key={sec._id} value={sec._id}>
                {sec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stream (Class 9–12) */}
        {streamList.length > 0 && (
          <div className="w-full sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
            <select
              name="streamId"
              value={filters.streamId}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="">Select Stream</option>
              {streamList.map((st) => (
                <option key={st._id} value={st._id}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="bg-[#0c3b73] hover:bg-[#1b5498] text-white px-6 py-2 rounded h-[38px]"
        >
          Apply
        </button>

        {/* Reset Button */}
        {isAnyFilterApplied && (
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded h-[38px]"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default MarksFilters
