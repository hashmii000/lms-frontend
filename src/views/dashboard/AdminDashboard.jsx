import { Users, GraduationCap, User, DollarSign, ChevronLeft, ChevronRight, IndianRupeeIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

/* -------------------- TOP STATS -------------------- */
const stats = [
  { title: "Students", value: "150000", icon: GraduationCap, color: "bg-green-100 text-green-600" },
  { title: "Teachers", value: "2250", icon: Users, color: "bg-blue-100 text-blue-600" },
  { title: "Parents", value: "5690", icon: User, color: "bg-yellow-100 text-yellow-600" },
  { title: "Earnings", value: "₹193000", icon: IndianRupeeIcon , color: "bg-red-100 text-red-600" },
];

/* -------------------- CHART DATA -------------------- */
const earningsData = [
  { day: "Mon", total: 30000, fees: 20000 },
  { day: "Tue", total: 20000, fees: 10000 },
  { day: "Wed", total: 60000, fees: 50000 },
  { day: "Thu", total: 70000, fees: 15000 },
  { day: "Fri", total: 50000, fees: 70000 },
  { day: "Sat", total: 80000, fees: 50000 },
  { day: "Sun", total: 90000, fees: 75000 },
];

const expenseData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 10000 },
  { month: "Mar", amount: 8000 },
];

const studentData = [
  { name: "Female", value: 45000 },
  { name: "Male", value: 105000 },
];

const COLORS = ["#3b82f6", "#f59e0b"];

/* -------------------- WEBSITE TRAFFIC -------------------- */
const traffic = [
  { label: "Direct", value: 12890, percent: 50, color: "bg-emerald-400" },
  { label: "Search", value: 7245, percent: 27, color: "bg-blue-500" },
  { label: "Referrals", value: 4256, percent: 8, color: "bg-yellow-400" },
  { label: "Social", value: 500, percent: 7, color: "bg-red-500" },
];

/* -------------------- NOTICE BOARD -------------------- */
const notices = [
  { date: "16 June, 2019", color: "bg-teal-400", title: "Great School manag mene esom text of the printing.", author: "Jennyfar Lopez", time: "5 min ago" },
  { date: "16 June, 2019", color: "bg-yellow-400", title: "Great School manag printing.", author: "Jennyfar Lopez", time: "5 min ago" },
  { date: "16 June, 2019", color: "bg-pink-500", title: "Great School manag meneesom.", author: "Jennyfar Lopez", time: "5 min ago" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Date</p>
          <p className="font-semibold text-sm text-gray-700">December 25, 2025</p>
        </div>
      </div>

      {/* -------------------- STATS -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between border border-gray-100 hover:-translate-y-1">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{item.title}</p>
              <p className="text-xl font-bold mt-2 text-gray-800">{item.value}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </div>
            <div className={`p-4 rounded-lg ${item.color} shadow-md`}>
              <item.icon className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* -------------------- CHARTS ROW -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        

        {/* Students */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-2">Student Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Gender demographics</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={studentData} innerRadius={70} outerRadius={100} dataKey="value" strokeWidth={2}>
                {studentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-sm mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-gray-700 text-sm font-medium">Female: 45,000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-gray-700 text-sm font-medium">Male: 1,05,000</span>
            </div>
          </div>
        </div>


        {/* Expenses */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-800">Earnings Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Weekly performance metrics</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Fees</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="fees" stroke="#ef4444" strokeWidth={3} fill="url(#colorFees)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

    
      </div>

      {/* -------------------- NEW ROW -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-800">Event Calendar</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <p className="font-semibold text-sm text-gray-700 mb-4">December 2025</p>
          <div className="grid grid-cols-7 text-center text-xs gap-1">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="font-semibold text-gray-500 py-2">{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div 
                key={i} 
                className={`py-2 rounded-lg font-medium transition-all cursor-pointer
                  ${i === 24 
                    ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

       

        {/* Notice Board */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-4">Notice Board</h2>
          <div className="space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar">
            {notices.map((n, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                <span className={`inline-block px-3 py-1.5 text-white text-sm font-medium rounded-full ${n.color} shadow-sm`}>
                  {n.date}
                </span>
                <p className="font-semibold text-sm text-gray-800 mt-3 leading-relaxed">{n.title}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span className="font-medium">{n.author}</span>
                  <span>•</span>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}