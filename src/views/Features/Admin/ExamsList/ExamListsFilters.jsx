/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Select, DatePicker, Button } from 'antd'

const { Option } = Select

const ExamListsFilters = ({
  searchTerm,
  setSearchTerm,
  onApplyFilters,
  onResetFilters,
  classList = [],
}) => {
  const [filters, setFilters] = useState({
    classId: null,
    category: null,
    fromDate: null,
    toDate: null,
  })

  /* ---------- search (instant) ---------- */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  /* ---------- apply ---------- */
  const handleApply = () => {
    onApplyFilters(filters)
  }

  /* ---------- reset ---------- */
  const handleReset = () => {
    setFilters({
      classId: null,
      category: null,
      fromDate: null,
      toDate: null,
    })
    setSearchTerm('')
    onResetFilters()
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-700">Filters & Search</h3>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-end">
        {/* 🔍 Search */}
        <div className="w-full xl:max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search exam"
              className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 🏫 Class */}
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <Select
            allowClear
            placeholder="Select Class"
            className="w-full"
            value={filters.classId}
            onChange={(value) => setFilters((prev) => ({ ...prev, classId: value }))}
          >
            {classList.map((cls) => (
              <Option key={cls._id} value={cls._id}>
                {cls.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* 📘 Category */}
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select
            allowClear
            placeholder="Select Category"
            className="w-full"
            value={filters.category}
            onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
          >
            <Option value="TEST">Test</Option>
            <Option value="EXAM">Exam</Option>
          </Select>
        </div>

        {/* ✅ Apply Button */}
        <button
          onClick={handleApply}
          className="bg-[#0c3b73] hover:bg-[#1b5498] text-white px-6 py-2 rounded h-[38px]"
        >
          Apply
        </button>

        {/* ♻ Reset Button */}
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded h-[38px]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default ExamListsFilters
