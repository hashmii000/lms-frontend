import React from 'react'
import AdminDashboard from './views/dashboard/AdminDashboard'
import StudentDashboard from './views/dashboard/StudentDashboard'
import ParentDashboard from './views/dashboard/ParentDashboard'
import TeachersDashboard from './views/dashboard/TeachersDashboard'
import FeeReports from './views/FeeAccount/FeeReports'
import AttendanceManagement from './views/attendance/AttendanceManagement'
import StudentAdmissionForm from './views/admission/StudentAdmissionForm'
import EnrollmentForm from './views/admission/EnrollmentForm'
import StudentTransfer from './views/StudentTransfer/StudentTransfer'
import ReportCard from './views/ReportCard/ReportCard'
import StudentDetailPage from './views/admission/StudentDetailPage'
import ClassMaster from './views/masters/class/ClassMaster'
import SectionMaster from './views/masters/section/SectionMaster'
import DocumentsMaster from './views/masters/documents/DocumentsMaster'
import SessionMaster from './views/masters/session/SessionMaster'
import StreamsMaster from './views/masters/streams/StreamsMaster'
import Demo from './views/Demo'
import RollNumberManage from './views/RollNumberManage/RollNumberManage'
import TeacherRegister from './views/teacher/TeacherRegister'
import TeacherDetailPage from './views/teacher/TeacherDetailPage'
import SubjectMaster from './views/masters/subject/subjectMaster'

// const Dashboard = React.lazy(() => import('./views/dashboard/AdminDashboard'))
import DashboardRouter from './views/dashboard/DashboardRouter'
import CommunicationUI from './views/Communication/Notice'
import StudentDetail from './views/Student/StudentDetail'
import StudentAttendance from './views/Student/studentAttendance/StudentAttendance'
import Marksheet from './views/Student/Marksheet/Marksheet'
import Students from './views/features/Teacher/MyClasses/Student/Student'
import Assignments from './views/features/Teacher/MyClasses/Assignment/Assignment'
import Timetable from './views/features/Teacher/timetable/timetable'
import Leaves from './views/features/Teacher/Leave/Leave'
import Attendance from './views/features/Teacher/MyClasses/Attendence/Attendence'
import ExamsMarks from './views/features/Teacher/ExamsMarks/ExamMarks'
import StudyMaterial from './views/features/Teacher/MyClasses/Materials/Material'
import TeacherDashboard from './views/features/Teacher/Dasboard/Dasboard'
import ExamMaster from './views/masters/Exam/ExamMaster'
import AdminTeachersList from './views/features/Admin/TeacherList/TeacherList'
import Marks from './views/pages/Marks/Marks'
import ExamLists from './views/Features/Admin/ExamsList/ExamLists'
import TeacherDetail from './views/teacherDashboard/TeacherDetail'
import AdminStudentList from './views/Features/Admin/StudentList/StudentList'
import FeesStructure from './views/features/SuperAdmin/FeeManagement/FeeStructure/Feestructure'
import FeesHead from './views/features/SuperAdmin/FeeManagement/FeeHead/FeeHead'
import TeacherAssigned from './views/teacher/TeacherAssigned/TeacherAssigned'
import StudentFeeCollection from './views/Student/fees/StudentFeeCollection'
import StudentFeeCollectionReport from './views/Student/fees/StudentFeeCollectionReport'
import FeeCollection from './views/Features/Admin/FeeCollection/Feecollection'
import ViewMarks from './views/pages/Marks/ViewMarks'
import StudentMarksheet from './views/Features/Student/Marksheet/StudentMarksheet'
import TeacherMarks from './views/Features/Teacher/Marksheet/TeacherMarks'
import TeacherViewMarks from './views/Features/Teacher/Marksheet/TeacherViewMarks'

const routes = [
  {
    path: '/dashboard',
    element: DashboardRouter,
    roles: ['SuperAdmin', 'Admin', 'Teacher', 'Student', 'Parent'],
  },

  {
    path: '/fee/feesStructure',
    element: FeesStructure,
    roles: ['SuperAdmin', 'Admin'],
  },

  {
    path: '/FeeManagement/FeesHead',
    element: FeesHead,
    roles: ['SuperAdmin', 'Admin'],
  },

  {
    path: '/fee/feescollection',
    element: FeeCollection,
    roles: ['Admin'],
  },
  {
    path: '/fee/feesreport',
    element: FeeReports,
    roles: ['Admin'],
  },

  {
    path: '/student/admission',
    element: StudentAdmissionForm,
    roles: ['Admin'],
  },
  {
    path: '/student/enrollment',
    element: EnrollmentForm,
    roles: ['Admin'],
  },
  {
    path: '/student/studentlist',
    element: AdminStudentList,
    roles: ['Admin'],
  },

  {
    path: '/student/studenttransfer',
    element: StudentTransfer,
    roles: ['Admin'],
  },
  {
    path: '/student/enrollment/:id',
    element: StudentDetailPage,
    roles: ['Admin'],
  },

  {
    path: '/attendance',
    element: AttendanceManagement,
    roles: ['Admin', 'Teacher', 'Student'],
  },

  {
    path: '/reportcard',
    element: ReportCard,
    roles: ['Admin', 'Teacher'],
  },
  {
    path: '/examsLists',
    element: ExamLists,
    roles: ['Admin'],
  },
  {
    path: '/marks',
    element: Marks,
    roles: ['Admin'],
  },
  {
    path: '/marks/viewMarks/:id',
    element: ViewMarks,
    roles: ['Admin'],
  },
  {
    path: '/master/class',
    element: ClassMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/subject',
    element: SubjectMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/section',
    element: SectionMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/documents',
    element: DocumentsMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/session',
    element: SessionMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/streams',
    element: StreamsMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/master/exam',
    element: ExamMaster,
    roles: ['SuperAdmin'],
  },
  {
    path: '/rollnumber',
    element: RollNumberManage,
    roles: ['Admin', 'Teacher'],
  },

  {
    path: '/teacher/register',
    element: TeacherRegister,
    roles: ['Admin'],
  },

  {
    path: '/teacher/list',
    element: AdminTeachersList,
    roles: ['Admin'],
  },
  {
    path: '/teacher/assignedClass',
    element: TeacherAssigned,
    roles: ['Admin', 'Teacher'],
  },

  {
    path: '/teacher/register/:id',
    element: TeacherDetailPage,
    roles: ['Admin'],
  },
  {
    path: '/communication',
    element: CommunicationUI,
    roles: ['Admin', 'Teacher', 'Student'],
  },

  /* Only Student */
  {
    path: '/studentdetail/:studentId',
    element: StudentDetail,
    roles: ['Student'],
  },
  {
    path: '/studentattendance/:studentId',
    element: StudentAttendance,
    roles: ['Student'],
  },
  {
    path: '/student-marksheet',
    element: StudentMarksheet,
    roles: ['Student'],
  },

  {
    path: '/StudentFeeCollection/:studentId',
    element: StudentFeeCollection,
    roles: ['Student'],
  },

  {
    path: '/StudentFeeCollectionReport/:studentId',
    element: StudentFeeCollectionReport,
    roles: ['Student'],
  },

  /* ================= TEACHER ================= */

  {
    path: '/TeacherDashboard',
    element: TeacherDashboard,
    roles: ['Teacher'],
  },

  {
    path: '/TeacherDetailPage/:teacherId',
    element: TeacherDetail,
    roles: ['Teacher'],
  },

  {
    path: '/teacher/my-classes/students',
    element: Students, // new
    roles: ['Teacher'],
  },
  {
    path: '/teacher/add-marks',
    element: TeacherMarks, // new
    roles: ['Teacher'],
  },
  {
    path: '/techer/marks/viewMarks/:id',
    element: TeacherViewMarks, // new
    roles: ['Teacher'],
  },

  {
    path: '/teacher/my-classes/attendance',
    element: Attendance, // new
    roles: ['Teacher'],
  },

  {
    path: '/teacher/my-classes/assignments',
    element: Assignments, // new
    roles: ['Teacher'],
  },

  {
    path: '/teacher/my-classes/materials',
    element: StudyMaterial, // new
    roles: ['Teacher'],
  },

  {
    path: '/teacher/exams-marks',
    element: ExamsMarks,
    roles: ['Teacher'],
  },

  {
    path: '/teacher/report-card',
    element: ReportCard,
    roles: ['Teacher'],
  },

  {
    path: '/teacher/timetable',
    element: Timetable,
    roles: ['Teacher'],
  },

  {
    path: '/teacher/leave',
    element: Leaves,
    roles: ['Teacher'],
  },
]

export default routes
