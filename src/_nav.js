/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import {
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  MoneyCollectOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  SwapOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  BookOutlined,
  FormOutlined,
  BarChartOutlined,
  CoffeeOutlined,
  NotificationOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { MdOutlineDashboard } from 'react-icons/md'
import { AppContext } from './Context/AppContext'
import { User } from 'lucide-react'

const iconStyle = { fontSize: '20px' }
const yellow = 'text-[#fabf22]'

const useNav = () => {
  const { user } = useContext(AppContext)
  const role = user?.role
  const isClassTeacher = user?.profile?.classesAssigned?.some((cls) => cls?.isClassTeacher === true)
  /* ================= SUPER ADMIN NAV ================= */
  const superAdminNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <MdOutlineDashboard className={`me-3 ${yellow}`} style={iconStyle} />,
    },

    {
      component: CNavGroup,
      name: 'Masters',
      to: '/master',
      icon: <AppstoreOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Session Master',
          to: '/master/session',
          icon: <CalendarOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Class Master',
          to: '/master/class',
          icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Section Master',
          to: '/master/section',
          icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },

        {
          component: CNavItem,
          name: 'Streams Master',
          to: '/master/streams',
          icon: <BookOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Subject Master',
          to: '/master/subject',
          icon: <BookOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Documents  Master',
          to: '/master/documents',
          icon: <FileTextOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Exam Master',
          to: '/master/exam',
          icon: <BarChartOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
      ],
    },

    {
      component: CNavGroup,
      name: 'Fee Management',
      to: '/FeeManagement',
      icon: <MoneyCollectOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Academic Tuition Fees',
          to: '/fee/feesStructure',
          icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Additional Fees',
          to: '/FeeManagement/FeesHead',
          icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
      ],
    },

    {
      component: CNavItem,
      name: 'Notice Board ',
      to: '/communication',
      icon: <NotificationOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
  ]
  /* ================= ADMIN NAV ================= */
  const adminNav = [
    {
      component: CNavItem,
      name: 'Admin Dashboard',
      to: '/dashboard',
      icon: <DashboardOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavGroup,
      name: 'Student Management',
      to: '/student',
      icon: <UserOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Admission Form',
          to: '/student/admission',
          icon: <FormOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Enrollment Form',
          to: '/student/enrollment',
          icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Student List',
          to: '/student/StudentList',
          icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Student Transfer',
          to: '/student/studenttransfer',
          icon: <SwapOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Roll Number Manage',
          to: '/rollnumber',
          icon: <CalendarOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Attendance',
          to: '/attendance',
          icon: <CheckSquareOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Teacher Management',
      to: '/teacher',
      icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Registration Form',
          to: '/teacher/register',
          icon: <FormOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Teacher List',
          to: '/teacher/list',
          icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Assigned Classes',
          to: '/teacher/assignedClass',
          icon: <BookOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Fee Management',
      to: '/fee',
      icon: <MoneyCollectOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Academic Tuition Fees',
          to: '/fee/feesStructure',
          icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Additional Fees',
          to: '/FeeManagement/FeesHead',
          icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Fee Collection',
          to: '/fee/feescollection',
          icon: <MoneyCollectOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
        {
          component: CNavItem,
          name: 'Fee Reports',
          to: '/fee/feesreport',
          icon: <BarChartOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Notice Board ',
      to: '/communication',
      icon: <NotificationOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Exams Lists',
      to: '/examsLists',
      icon: <BarChartOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Marksheet',
      to: '/marks',
      icon: <FileTextOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    // {
    //   component: CNavItem,
    //   name: 'Report Card',
    //   to: '/reportcard',
    //   icon: <SolutionOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },
  ]

  /* ================= STUDENT NAV ================= */
  const studentNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <DashboardOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'My Profile',
      to: `/studentdetail/:studentId`,
      icon: <UserOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Attendance',
      to: '/studentattendance/:studentId',
      icon: <CalendarOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },

    {
      component: CNavItem,
      name: 'Academic Fees',
      to: '/StudentFeeCollection/:studentId',
      icon: <MoneyCollectOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Payment History',
      to: '/StudentFeeCollectionReport/:studentId',
      icon: <FileTextOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Notice Board',
      to: '/communication',
      icon: <NotificationOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
    {
      component: CNavItem,
      name: 'Marksheet',
      to: '/student-marksheet',
      icon: <FileTextOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
  ]

  /* ================= PARENT NAV ================= */
  const parentNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
  ]

  /* ================= TEACHER NAV ================= */
  const teacherNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <DashboardOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },

    {
      component: CNavItem,
      name: 'Teacher Detail',
      to: '/TeacherDetailPage/:teacherId',
      icon: <UserOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },

    {
      component: CNavGroup,
      name: 'My Classes',
      to: '/teacher/my-classes',
      icon: <TeamOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
      items: [
        {
          component: CNavItem,
          name: 'Students',
          to: '/teacher/my-classes/students',
          icon: <UserOutlined className="me-2" />,
        },

        ...(isClassTeacher
          ? [
              {
                component: CNavItem,
                name: 'Attendance',
                to: '/teacher/my-classes/attendance',
                icon: <CheckSquareOutlined className="me-2" />,
              },
            ]
          : []),

        ...(isClassTeacher
          ? [
              {
                component: CNavItem,
                name: 'Marksheet',
                to: '/teacher/add-marks',
                icon: <FileTextOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
              },
            ]
          : []),

        // {
        //   component: CNavItem,
        //   name: 'Assignments',
        //   to: '/teacher/my-classes/assignments',
        //   icon: <FileTextOutlined className="me-2" />,
        // },
        // {
        //   component: CNavItem,
        //   name: 'Study Material',
        //   to: '/teacher/my-classes/materials',
        //   icon: <BookOutlined className="me-2" />,
        // },
      ],
    },
    // {
    //   component: CNavItem,
    //   name: 'Roll Number Manage',
    //   to: '/rollnumber',
    //   icon: <CalendarOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Exams & Marks',
    //   to: '/teacher/exams-marks',
    //   icon: <FormOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },

    // {
    //   component: CNavItem,
    //   name: 'Report Card',
    //   to: '/teacher/report-card',
    //   icon: <BarChartOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },

    // {
    //   component: CNavItem,
    //   name: 'Timetable',
    //   to: '/teacher/timetable',
    //   icon: <CalendarOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },

    // {
    //   component: CNavItem,
    //   name: 'Leave Management',
    //   to: '/teacher/leave',
    //   icon: <CoffeeOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },

    {
      component: CNavItem,
      name: 'Notice Board ',
      to: '/communication',
      icon: <NotificationOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
  ]
  /* ================= ACCOUNTANT NAV ================= */
  const accountantNav = [
    // {
    //   component: CNavItem,
    //   name: 'Dashboard',
    //   to: '/dashboard',
    //   icon: <MoneyCollectOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    // },
    {
      component: CNavItem,
      name: 'Fee Collection',
      to: '/fee/feescollection',
      icon: <FileDoneOutlined className={`me-3 ${yellow}`} style={iconStyle} />,
    },
  ]
  /* ================= ROLE SWITCH ================= */
  if (!role) return []
  if (role === 'SuperAdmin') return superAdminNav
  if (role === 'Admin') return adminNav
  if (role === 'Accountant') return accountantNav
  if (role === 'Teacher') return teacherNav
  if (role === 'Student') return studentNav
  if (role === 'Parent') return parentNav

  return []
}

export default useNav
