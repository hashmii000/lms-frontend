// import React, { useContext, useEffect, useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilMenu } from '@coreui/icons'

// import { AppHeaderDropdown } from './header/index'
// import Notification from './header/Notification'
// import { SessionContext } from '../Context/Seesion'

// const AppHeader = () => {
//   const headerRef = useRef()

//   const dispatch = useDispatch()
//   const sidebarShow = useSelector((state) => state.sidebarShow)
// const { currentSession, loading } = useContext(SessionContext)

//   return (
//     <CHeader position="sticky" className=" p-0" ref={headerRef}>
//       <CContainer
//         style={{ backgroundColor: ' #042954', color: 'white' }}
//         className="border-bottom px-4"
//         fluid
//       >
//         <CHeaderToggler
//           onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
//           style={{ marginInlineStart: '-14px' }}
//         >
//           <CIcon icon={cilMenu} style={{ color: 'white' }} size="lg" />
//         </CHeaderToggler>
//         <CHeaderNav className="d-none d-md-flex"></CHeaderNav>

//         <CHeaderNav className='flex justify-between gap-2 items-center'>
//            <AppHeaderDropdown />
//           <Notification />

//         </CHeaderNav>
//       </CContainer>
//     </CHeader>
//   )
// }

// export default AppHeader
import React, { useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { SessionContext } from '../Context/Seesion'

import { AppHeaderDropdown } from './header/index'
import Notification from './header/Notification'

const AppHeader = () => {
  const headerRef = useRef()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { currentSession, loading } = useContext(SessionContext)

  return (
    <CHeader position="sticky" className="p-0" ref={headerRef}>
      <CContainer
        fluid
        className="border-bottom px-4 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: '#042954', color: 'white' }}
      >
        {/* LEFT */}
        <div className="d-flex align-items-center gap-3">
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} style={{ color: 'white' }} size="lg" />
          </CHeaderToggler>
        </div>

        {/* RIGHT */}
        <CHeaderNav className="d-flex align-items-center gap-3">
          
          {/* SESSION */}
          <div className="d-flex flex-column text-white">
            <span className="text-xs">Session</span>
            <span className="fw-semibold text-warning">
              {loading ? 'Loading...' : currentSession?.sessionName || 'N/A'}
            </span>
          </div>

          {/* DIVIDER | */}
          <span
            style={{
              height: '32px',
              width: '1px',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          />

          {/* PROFILE + NOTIFICATION */}
        
          <AppHeaderDropdown />
            <Notification />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader

