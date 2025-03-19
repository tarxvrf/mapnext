import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
type props={
    name:string
}
function Dashboard() {
    const [user,setuser] = useState<props>()
    const router = useRouter()
    useEffect(()=>{
    const getsesion = sessionStorage.getItem("user")
    if(!getsesion){
     router.push('/')
    }
    if(getsesion){
        setuser(JSON.parse(getsesion))
    }
    },[router])
  return (
    <div className='ml-32 px-10 py-10'>
     Hallo {user && user?.name} Ini halaman dashboard
    </div>
  )
}

export default Dashboard
