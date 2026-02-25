import React, { useState } from 'react'
import {
  Users,
  ClipboardCheck,
  GraduationCap,
  DollarSign,
  MoreVertical,
  Search,
  IndianRupee,
} from 'lucide-react'

const TeachersDashboard = () => {
  const [searchRoll, setSearchRoll] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchClass, setSearchClass] = useState('')

  const stats = [
    {
      label: 'Total Students',
      value: '3500',
      icon: Users,
      color: 'bg-purple-50 text-purple-500',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      label: 'Total Exams',
      value: '1905',
      icon: ClipboardCheck,
      color: 'bg-blue-50 text-blue-500',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Graduate Studies',
      value: '23890',
      icon: GraduationCap,
      color: 'bg-yellow-50 text-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      label: 'Total Income',
      value: '₹2102050',
      icon: IndianRupee,
      color: 'bg-red-50 text-red-500',
      gradient: 'from-red-400 to-red-600',
    },
  ]

  const students = [
    {
      roll: '#0021',
      name: 'Mark Willy',
      gender: 'Male',
      class: '2',
      section: 'A',
      parents: 'Jack Sparrow',
      address: 'TA-107 Newyork',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-green-400',
    },
    {
      roll: '#0022',
      name: 'Jessia Rose',
      gender: 'Female',
      class: '1',
      section: 'A',
      parents: 'Maria Jamans',
      address: '59 Australia, Sydney',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-cyan-400',
    },
    {
      roll: '#0023',
      name: 'Mark Willy',
      gender: 'Male',
      class: '2',
      section: 'A',
      parents: 'Jack Sparrow',
      address: 'TA-107 Newyork',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-pink-400',
    },
    {
      roll: '#0024',
      name: 'Jessia Rose',
      gender: 'Female',
      class: '1',
      section: 'A',
      parents: 'Maria Jamans',
      address: '59 Australia, Sydney',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-yellow-400',
    },
    {
      roll: '#0025',
      name: 'Mark Willy',
      gender: 'Male',
      class: '2',
      section: 'A',
      parents: 'Jack Sparrow',
      address: 'TA-107 Newyork',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-purple-400',
    },
    {
      roll: '#0026',
      name: 'Jessia Rose',
      gender: 'Female',
      class: '1',
      section: 'A',
      parents: 'Maria Jamans',
      address: '59 Australia, Sydney',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-teal-400',
    },
    {
      roll: '#0027',
      name: 'Mark Willy',
      gender: 'Male',
      class: '2',
      section: 'A',
      parents: 'Jack Sparrow',
      address: 'TA-107 Newyork',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-pink-400',
    },
    {
      roll: '#0028',
      name: 'Jessia Rose',
      gender: 'Female',
      class: '1',
      section: 'A',
      parents: 'Maria Jamans',
      address: '59 Australia, Sydney',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-orange-400',
    },
    {
      roll: '#0029',
      name: 'Mark Willy',
      gender: 'Male',
      class: '2',
      section: 'A',
      parents: 'Jack Sparrow',
      address: 'TA-107 Newyork',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-green-400',
    },
    {
      roll: '#0030',
      name: 'Jessia Rose',
      gender: 'Female',
      class: '1',
      section: 'A',
      parents: 'Maria Jamans',
      address: '59 Australia, Sydney',
      dob: '02/05/2001',
      phone: '+ 123 9988568',
      email: 'kazifahim93@gmail.com',
      avatar: 'bg-purple-400',
    },
  ]

  const notifications = [
    {
      date: '16 June, 2019',
      text: 'Great School manag mene esom tus eleifend lectus sed maximus mi faucibusenting.',
      author: 'Jennyfer Lopez',
      time: '5 min ago',
      color: 'bg-teal-400',
    },
    {
      date: '16 June, 2019',
      text: 'Great School manag printing.',
      author: 'Jennyfer Lopez',
      time: '5 min ago',
      color: 'bg-yellow-400',
    },
    {
      date: '16 June, 2019',
      text: 'Great School manag Nulla rhoncus eleifensed mim us mi faucibus id. Mauris wasiag sodales lobortismeneeares',
      author: 'Jennyfer Lopez',
      time: '5 min ago',
      color: 'bg-pink-400',
    },
  ]

  const chartData = {
    female: 10500,
    male: 24500,
    femalePercent: 30,
    malePercent: 70,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-bold text-gray-800">Teachers Dashboard</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-gray-500 text-sm">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-orange-500 font-medium text-sm">Teachers</span>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students Chart */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-gray-800">Students</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Donut Chart */}
            <div className="relative flex items-center justify-center mb-8">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.femalePercent * 6.28} 628`}
                />
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="30"
                  strokeDasharray={`${chartData.malePercent * 6.28} 628`}
                  strokeDashoffset={`-${chartData.femalePercent * 6.28}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">
                    {chartData.female + chartData.male}
                  </p>
                  <p className="text-sm text-gray-500">Total Students</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">Female Students</span>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {chartData.female.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">Male Students</span>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {chartData.male.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-gray-800">Notifications</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className="border-l-4 border-gray-100 hover:border-orange-500 pl-4 py-3 transition-all hover:bg-gray-50 rounded-r-lg"
                >
                  <div
                    className={`${notif.color} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2`}
                  >
                    {notif.date}
                  </div>
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">{notif.text}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{notif.author}</span> / {notif.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Students Table */}
        <div className="mt-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-800">My Students</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Roll ..."
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name ..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Class ..."
                  value={searchClass}
                  onChange={(e) => setSearchClass(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm">
                SEARCH
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="text-left py-4 px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Roll</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Photo</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Name</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Gender</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Class</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Section</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Parents</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Address</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                    Date Of Birth
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Phone</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">E-mail</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all"
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-700">
                      {student.roll}
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`w-10 h-10 ${student.avatar} rounded-full flex items-center justify-center shadow-md`}
                      >
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 font-medium">{student.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.gender}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.class}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.section}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.parents}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.address}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.dob}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.phone}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{student.email}</td>
                    <td className="py-4 px-4">
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-all">
              Previous
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-md">
              1
            </button>
            <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeachersDashboard
