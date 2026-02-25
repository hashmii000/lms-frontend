import React, { useState } from 'react';
import { DollarSign, Bell, GraduationCap, Wallet, Search, MoreVertical, ChevronLeft, ChevronRight, IndianRupee } from 'lucide-react';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('expenses');

  const stats = [
    { label: 'Due Fees', value: '₹450', icon: IndianRupee, color: 'bg-red-50 text-red-500' },
    { label: 'Notifications', value: '1', icon: Bell, color: 'bg-purple-50 text-purple-500' },
    { label: 'Result', value: '1', icon: GraduationCap, color: 'bg-yellow-50 text-yellow-500' },
    { label: 'Expenses', value: '₹19300', icon: Wallet, color: 'bg-blue-50 text-blue-500' }
  ];

  const kids = [
    {
      name: 'Jessia Rose',
      gender: 'Female',
      class: '2',
      roll: '#2225',
      section: 'A',
      admissionId: '#0021',
      admissionDate: '07.08.2017',
      avatar: 'bg-cyan-400'
    },
    {
      name: 'Jack Steve',
      gender: 'Male',
      class: '3',
      roll: '#2205',
      section: 'A',
      admissionId: '#0045',
      admissionDate: '07.08.2017',
      avatar: 'bg-red-400'
    }
  ];

  const expenses = [
    { id: '#0021', expense: 'Exam Fees', amount: '$150.00', status: 'Paid', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0022', expense: 'Semester Fees', amount: '$350.00', status: 'Due', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0023', expense: 'Exam Fees', amount: '$150.00', status: 'Paid', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0024', expense: 'Exam Fees', amount: '$150.00', status: 'Due', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0025', expense: 'Exam Fees', amount: '$150.00', status: 'Paid', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0026', expense: 'Semester Fees', amount: '$350.00', status: 'Due', email: 'akkhorschool@gmail.com', date: '22/02/2019' },
    { id: '#0027', expense: 'Exam Fees', amount: '$150.00', status: 'Paid', email: 'akkhorschool@gmail.com', date: '22/02/2019' }
  ];

  const results = [
    { id: '#0021', examName: 'Class Test', subject: 'English', class: '2', roll: '#0045', grade: 'A', percent: '99.00 × 100', date: '22/02/2019' },
    { id: '#0022', examName: 'Class Test', subject: 'English', class: '1', roll: '#0025', grade: 'A', percent: '99.00 × 100', date: '22/02/2019' },
    { id: '#0023', examName: 'Class Test', subject: 'Drawing', class: '2', roll: '#0045', grade: 'A', percent: '99.00 × 100', date: '22/02/2019' },
    { id: '#0024', examName: 'Class Test', subject: 'English', class: '1', roll: '#0048', grade: 'A', percent: '99.00 × 100', date: '22/02/2019' },
    { id: '#0025', examName: 'Class Test', subject: 'Chemistry', class: '8', roll: '#0050', grade: 'A', percent: '99.00 × 100', date: '22/02/2019' }
  ];

  const notifications = [
    { date: '16 June, 2019', text: 'Great School manag mene esom tus eleifend lectus sed maximus mi faucibusenting.', author: 'Jennyfer Lopez', time: '5 min ago', color: 'bg-cyan-400' },
    { date: '16 June, 2019', text: 'Great School manag printing.', author: 'Jennyfer Lopez', time: '5 min ago', color: 'bg-yellow-400' },
    { date: '16 June, 2019', text: 'Great School manag Nulla rhoncus eleifensed mim us mi faucibus id. Mauris wasiag sodales lobortismeneeares', author: 'Jennyfer Lopez', time: '5 min ago', color: 'bg-pink-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg  font-bold text-gray-800">  Parent Dashboard</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-orange-500 font-medium text-sm">Parents</span>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Kids Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-800">My Kids</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {kids.map((kid, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`w-16 h-16 ${kid.avatar} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <div className="w-12 h-12 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium text-gray-800">{kid.name}</span>
                        <span className="text-gray-500">Gender:</span>
                        <span className="text-gray-700">{kid.gender}</span>
                        <span className="text-gray-500">Class:</span>
                        <span className="text-gray-700">{kid.class}</span>
                        <span className="text-gray-500">Roll:</span>
                        <span className="text-gray-700">{kid.roll}</span>
                        <span className="text-gray-500">Section:</span>
                        <span className="text-gray-700">{kid.section}</span>
                        <span className="text-gray-500">Admission Id:</span>
                        <span className="text-gray-700">{kid.admissionId}</span>
                        <span className="text-gray-500">Admission Date:</span>
                        <span className="text-gray-700">{kid.admissionDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-800">Notifications</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notif, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className={`${notif.color} text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-2`}>
                      {notif.date}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{notif.text}</p>
                    <p className="text-sm text-gray-500">{notif.author} / {notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Buttons */}
            <div className="flex gap-2 bg-white text-sm rounded-xl shadow-sm p-2">
              <button
                onClick={() => setActiveTab('expenses')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium  transition-colors ${
                  activeTab === 'expenses'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Expenses
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium  transition-colors ${
                  activeTab === 'results'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Exam Results
              </button>
            </div>

            {/* All Expenses */}
            {activeTab === 'expenses' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-bold text-gray-800">All Expenses</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
                  <input
                    type="text"
                    placeholder="Search by Exam ..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Search by Subject ..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">
                      SEARCH
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">ID</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Expense</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Amount</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">E-Mail</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Date</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm text-gray-700">{expense.id}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{expense.expense}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{expense.amount}</td>
                          <td className="py-3 px-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              expense.status === 'Paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {expense.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-700">{expense.email}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{expense.date}</td>
                          <td className="py-3 px-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end gap-2 mt-6">
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* All Exam Results */}
            {activeTab === 'results' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-bold text-gray-800">All Exam Results</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
                  <input
                    type="text"
                    placeholder="Search by Exam ..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Search by Subject ..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="bg-orange-500  hover:bg-orange-600 text-white text-sm px-6 py-2 rounded-lg font-medium transition-colors">
                      SEARCH
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">ID</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Exam Name</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Subject</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Class</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Roll</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Grade</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Percent</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Date</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm text-gray-700">{result.id}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.examName}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.subject}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.class}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.roll}</td>
                          <td className="py-3 px-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              result.grade === 'A'
                                ? 'bg-green-100 text-green-700'
                                : result.grade === 'B'
                                ? 'bg-blue-100 text-blue-700'
                                : result.grade === 'C'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {result.grade}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.percent}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{result.date}</td>
                          <td className="py-3 px-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end gap-2 mt-6">
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;