import { useState } from "react"
import { 
  Menu, Bell, Mail, ChevronDown, Search, MoreVertical, 
  Calendar, Award, TrendingUp, Users, BookOpen, 
  ChevronLeft, ChevronRight, Download, Filter
} from "lucide-react"

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState("December 2025")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    

      <div className="flex">
        {/* Sidebar - Hidden for simplicity, can be added */}
        
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
          {/* Breadcrumb */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900 mb-2">Student Dashboard</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-blue-600 font-medium">Student</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className=" rounded-lg p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
              <div className=" flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-400 text-white  rounded-xl backdrop-blur-sm">
                  <BookOpen className=" w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">11</span>
              </div>
              <p className="text-gray-800 text-sm font-medium">Notifications</p>
            </div>

            <div className=" rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-400 text-white rounded-xl backdrop-blur-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-gray-800  text-sm font-medium">Events</p>
            </div>

            <div className=" rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-400 text-white rounded-xl backdrop-blur-sm">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">0%</span>
              </div>
              <p className="text-gray-800  text-sm font-medium">Attendance</p>
            </div>

            <div className="  rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-400 text-white rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">A+</span>
              </div>
              <p className="text-gray-800  text-sm font-medium">Average Grade</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Me Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-between items-start -mt-12 mb-4">
                    <div className="relative">
                      <img
                        src="https://i.pravatar.cc/100?img=1"
                        className="w-24 h-24 rounded-lg border-4 border-white shadow-lg"
                        alt="Jessia Rose"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <button className="mt-14 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1">Abhishek  </h3>
                  <p className="text-sm text-gray-500 mb-6"> Class 2</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-medium text-gray-900">Male</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Father Name</span>
                      <span className="font-medium text-gray-900">Fahim Rahman</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Mother Name</span>
                      <span className="font-medium text-gray-900">Jamatul Kazi</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Date Of Birth</span>
                      <span className="font-medium text-gray-900">07.08.2006</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Religion</span>
                      <span className="font-medium text-gray-900">Islam</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">E-Mail</span>
                      <span className="font-medium text-blue-600 text-xs">jessiaeose@gmail.com</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Admission Date</span>
                      <span className="font-medium text-gray-900">05.01.2019</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Section</span>
                      <span className="font-medium text-gray-900">A</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Roll No.</span>
                      <span className="font-medium text-gray-900">10005</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Address</span>
                      <span className="font-medium text-gray-900 text-right">House #10, Road #6, India</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium text-gray-900">+91 985541888</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Results + Bottom Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Exam Results Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">All Exam Results</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by Exam..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                      />
                    </div>
                    <div className="relative flex-1 min-w-[200px]">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by Subject..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                      />
                    </div>
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
                    />
                    <button className="px-6 py-2 text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      SEARCH
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Exam Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Percent</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {[
                        { id: "#0021", exam: "Class Test", subject: "English", grade: "A", percent: "99.00 > 100", date: "22/02/2019" },
                        { id: "#0022", exam: "Class Test", subject: "English", grade: "A", percent: "99.00 > 100", date: "22/02/2019" },
                        { id: "#0023", exam: "Class Test", subject: "Chemistry", grade: "A", percent: "99.00 > 100", date: "22/02/2019" },
                        { id: "#0024", exam: "Class Test", subject: "English", grade: "A", percent: "99.00 > 100", date: "22/02/2019" },
                        { id: "#0025", exam: "Class Test", subject: "Chemistry", grade: "A", percent: "99.00 > 100", date: "22/02/2019" },
                        { id: "#0025", exam: "Class Test", subject: "Chemistry", grade: "D", percent: "70.00 > 100", date: "22/02/2019" },
                        { id: "#0025", exam: "Class Test", subject: "English", grade: "C", percent: "80.00 > 100", date: "22/02/2019" },
                        { id: "#0025", exam: "Class Test", subject: "English", grade: "B", percent: "99.00 > 100", date: "22/02/2019" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-4">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{row.id}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{row.exam}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{row.subject}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold
                              ${row.grade === 'A' ? 'bg-emerald-100 text-emerald-700' : 
                                row.grade === 'B' ? 'bg-blue-100 text-blue-700' : 
                                row.grade === 'C' ? 'bg-amber-100 text-amber-700' : 
                                'bg-red-100 text-red-700'}`}>
                              {row.grade}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600">{row.percent}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{row.date}</td>
                          <td className="px-4 py-2">
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">Showing 1 to 8 of 8 results</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-4 py-2 text-sm bg-amber-400 text-white rounded-lg font-medium">
                      1
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Attendance */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold text-gray-900">Attendance</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#FCD34D"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray="440"
                        strokeDashoffset="154"
                        className="transition-all duration-1000"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#3B82F6"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray="440"
                        strokeDashoffset="286"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900">65.8%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Absent</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">28.2%</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Present</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">65.8%</p>
                    </div>
                  </div>
                </div>

                {/* Event Calendar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">Event Calendar</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 text-sm">{selectedMonth}</h4>
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3 text-xs">
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600">Day</button>
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600">Week</button>
                    <button className="px-3 py-1 rounded-lg bg-pink-500 text-white">Month</button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="py-2 font-semibold text-gray-600">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <button
                        key={day}
                        className={`aspect-square rounded-lg flex items-center justify-center transition-all
                          ${day === 23 ? 'bg-pink-500 text-white font-semibold shadow-lg shadow-pink-200' : 
                            day === 11 ? 'bg-blue-100 text-blue-600 font-medium' : 
                            'hover:bg-gray-100 text-gray-700'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold text-gray-900">Notifications</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar">
                    {[
                      { date: "16 June, 2019", color: "bg-teal-400", title: "Great School manag mene esom lux elefend lectus sed maximus", author: "Jennyfer Lopez", time: "5 min ago" },
                      { date: "02 June, 2019", color: "bg-amber-400", title: "Great School manag printing.", author: "Jennyfer Lopez", time: "3 min ago" },
                      { date: "19 June, 2019", color: "bg-pink-500", title: "Great School manag luctus rhoncus elefend mina us nel", author: "Jennyfer Lopez", time: "1 min ago" },
                    ].map((notif, i) => (
                      <div key={i} className="group">
                        <div className={`${notif.color} text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2`}>
                          {notif.date}
                        </div>
                        <div className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
                          <p className="text-sm text-gray-900 font-medium mb-2 line-clamp-2">{notif.title}</p>
                          <p className="text-sm text-gray-500">{notif.author} / {notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}