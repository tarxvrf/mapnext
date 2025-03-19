import Header from '@/pages/UIcomponents/Header'
import Menu from '@/pages/UIcomponents/Menu'
import React from 'react'

function Framedashboard({children}:{children:React.ReactNode}) {
  return (
    <div>
        <Header/>
       <Menu/>
      {children}
    </div>
  )
}

export default Framedashboard
