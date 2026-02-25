/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { Layers, Edit, Trash2, Plus, AlertTriangle } from 'lucide-react'
import { deleteRequest, getRequest, putRequest } from '../../../../Helpers'
import toast from 'react-hot-toast'
import { Empty, Pagination } from 'antd'
import ExamListsFilters from './ExamListsFilters'
import ExamListsModal from './ExamListsModal'
import Loader from '../../../../components/Loading/Loader'
import { SessionContext } from '../../../../Context/Seesion'

const ExamLists = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [classList, setClassList] = useState([])
  const [appliedClassId, setAppliedClassId] = useState(null)
  const { currentSession } = useContext(SessionContext)

  const [filters, setFilters] = useState({
    classId: null,
    category: null,
    fromDate: null,
    toDate: null,
  })
  useEffect(() => {
    if (!currentSession?._id) return
    getRequest(`classes?isPagiantion=false&limit=100&session=${currentSession?._id}`)
      .then((res) => {
        console.log('class', res)

        setClassList(res?.data?.data?.classes || [])
      })
      .catch(() => toast.error('Failed to fetch classes'))
  }, [currentSession])

  const formatDateDDMMYYYY = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()
    return `${dd}-${mm}-${yyyy}`
  }

  /* ================= FETCH ExamLists ================= */
  useEffect(() => {
    if (!appliedClassId || !currentSession?._id) return
    setLoading(true)
    const params = new URLSearchParams({
      page,
      limit,
      sessionId: currentSession?._id,
    })

    if (searchTerm) params.append('search', searchTerm)
    if (filters.classId) params.append('classId', filters.classId)
    if (filters.category) params.append('category', filters.category)

    getRequest(`examsList?${params.toString()}`)
      .then((res) => {
        const responseData = res?.data?.data
        setData(responseData?.examLists || [])
        setTotal(responseData?.totalExamLists || 0)
      })
      .catch(() => toast.error('Failed to fetch exams'))
      .finally(() => setLoading(false))
  }, [page, limit, searchTerm, filters, updateStatus, appliedClassId, currentSession])

  /* ================= DELETE ================= */
  const confirmDelete = () => {
    if (!selectedItem?._id) return
    setLoading(true)

    deleteRequest(`examsList/${selectedItem._id}`)
      .then((res) => {
        toast.success(res?.data?.message || 'Section deleted')
        setUpdateStatus((prev) => !prev)
        setShowDeleteModal(false)
        setSelectedItem(null)
      })
      .catch((err) => toast.error(err?.response?.data?.message || 'Delete failed'))
      .finally(() => setLoading(false))
  }
  const handleApplyFilters = (appliedFilters) => {
    if (!appliedFilters.classId) {
      toast.error('Please select class first')
      return
    }
    setAppliedClassId(appliedFilters.classId)
    setFilters(appliedFilters)
    setPage(1)
  }

  const handleResetFilters = () => {
    setFilters({
      classId: null,
      category: null,
      fromDate: null,
      toDate: null,
    })
    setAppliedClassId(null)
    setSearchTerm('')
    setData([])
    setTotal(0)
    setPage(1)
  }

  /* ================= STATUS TOGGLE ================= */
  const handleToggle = (id) => {
    if (isToggling) return

    const selected = data.find((item) => item._id === id)
    if (!selected) return

    const newStatus = !selected.isActive
    setIsToggling(true)

    putRequest({
      url: `examsList/${id}`,
      cred: { isActive: newStatus },
    })
      .then(() => {
        toast.success(`Section ${newStatus ? 'Activated' : 'Deactivated'}`)
        setData((prev) =>
          prev.map((item) => (item._id === id ? { ...item, isActive: newStatus } : item)),
        )
      })
      .catch(() => toast.error('Failed to update status'))
      .finally(() => setIsToggling(false))
  }

  return (
    <div className="min-h-screen">
      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <b>{selectedItem?.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className={`px-5 py-2 text-white ${
                  loading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="px-4 py-3 bg-white rounded border mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <Layers className="text-[#e24028] w-5 h-5 sm:w-6 sm:h-6" />
              Exam Lists
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage exams according to sessions and classes
            </p>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => {
              setSelectedItem(null)
              setIsModalOpen(true)
            }}
            className="bg-[#0c3b73] hover:bg-blue-700 text-white 
                 px-3 py-2 sm:px-4 sm:py-2 
                 rounded flex items-center justify-center gap-2
                 text-sm  w-full sm:w-auto"
          >
            <Plus size={16} className="sm:w-4 sm:h-4" />
            Add Exams
          </button>
        </div>
      </div>
      {/* ================= FILTER ================= */}
      <ExamListsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        classList={classList}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {loading && (
        <div className="flex flex-col justify-center items-center py-10">
          <Loader /> Loading Exam List Data ...
        </div>
      )}

      {/* ================= TABLE ================= */}
      {!loading && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-2 text-center">Sr. No.</th>
                <th className="px-3 py-2 text-center">Exam Name</th>
                <th className="px-3 py-2 text-center">Exam Type</th>
                <th className="px-3 py-2 text-center">Class</th>
                <th className="px-3 py-2 text-center">From Date</th>
                <th className="px-3 py-2 text-center">To Date</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!appliedClassId ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    Please select class to show data
                    <Empty />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No Records Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                    <td className="border px-3 py-2 text-center">{item?.examMaster?.examName}</td>
                    <td className="border px-3 py-2 text-center">{item?.examMaster?.category}</td>
                    <th className="border px-3 py-2 text-center">{item?.class?.className}</th>
                    <th className="border px-3 py-2 text-center">
                      {formatDateDDMMYYYY(item?.fromDate)}
                    </th>
                    <th className="border px-3 py-2 text-center">
                      {formatDateDDMMYYYY(item?.toDate)}
                    </th>
                    {/* STATUS */}
                    <td className="border px-3 py-2 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.isActive}
                          disabled={isToggling}
                          onChange={() => handleToggle(item._id)}
                        />
                        <div className="w-9 h-5 bg-red-500 peer-checked:bg-green-500 rounded-full" />
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4" />
                      </label>
                    </td>

                    {/* ACTION */}
                    <td className="border px-3 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setIsModalOpen(true)
                          }}
                          className="text-blue-600 hover:bg-blue-600 hover:text-white p-2  rounded-full"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setShowDeleteModal(true)
                          }}
                          className="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ---------- Pagination ---------- */}
          {!loading && data?.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}{' '}
                  results
                </div>
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}
                  pageSizeOptions={['5', '10', '20', '50', '100', '200', '500', '1000']}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={true}
                  onShowSizeChange={(current, size) => {
                    setLimit(size)
                    setPage(1)
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <ExamListsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalData={selectedItem}
          setModalData={setSelectedItem}
          setUpdateStatus={setUpdateStatus}
        />
      )}
    </div>
  )
}

export default ExamLists
