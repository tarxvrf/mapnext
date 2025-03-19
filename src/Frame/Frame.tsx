
import Navbar from '@/pages/UIcomponents/Navbar'
import React from 'react'

function Frame({children}:{children:React.ReactNode}) {
  return (
    <div>
    <Navbar/>
      <div >
      {children}
      </div>
    </div>
  )
}

export default Frame
