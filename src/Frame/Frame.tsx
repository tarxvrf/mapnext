
import Navbar from '@/pages/UIcomponents/Navbar'
import React from 'react'

function Frame({children}:{children:React.ReactNode}) {
  return (
    <div>
    <Navbar/>
      <div className='pt-[60px]' >
      {children}
      </div>
    </div>
  )
}

export default Frame
