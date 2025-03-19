import Header from '@/pages/UIcomponents/Header'
import Menu from '@/pages/UIcomponents/Menu'
import React from 'react'

function Framedashboard({children}:{children:React.ReactNode}) {
  return (
    <div>
        <Header/>
       <Menu/>
       <div className="ml-32 px-10 pt-20 overflow-y-auto h-[calc[100%-128px]] overflow-x-auto w-[calc[100%-64px]] bg-teal-900 ">
        {children}
       </div>
      
    </div>
  )
}

export default Framedashboard
