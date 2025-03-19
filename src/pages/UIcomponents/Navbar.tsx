import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const linkmenu=[
  { name:"Home", path:"/"},
  { name:"Contact", path:"/contact"}, 

    ]  
const linkauth=[
  { name:"Sign Up", path:"/registrasi"},
  { name:"Sign In", path:"/login"},
]

const Navbar = () => { 
  const path = usePathname();  
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="navbarcss">
      <div className="pl-14">
        <Link href="/"  className="avatar w-20"><Image src="/assets/logo.png" priority={true}  width={100} height={100} alt="tulus-dev"/></Link>
      </div>
      <div>
        <ul className="flex flex-row gap-5">
          {linkmenu.map((val, index) => (
            <Link key={index} href={val.path}> 
                 
              { isClient && path === val.path ? (
                <li className="text-yellow-300 font-semibold">{val.name}</li>
              ) : (
                val.name
              )}             
           
             </Link>
          ))}
        </ul>
      </div>
      <div className="pr-14">
      <ul className="flex flex-row gap-5">
          {linkauth.map((val, index) => (
            <Link key={index} href={val.path}> 
                 
              { isClient && path === val.path ? (
                <li className="text-yellow-300 font-semibold">{val.name}</li>
              ) : (
                val.name
              )}      
             </Link>
          ))}
        </ul>
           
      </div>
      
    </div>
  );
};
export default Navbar;
