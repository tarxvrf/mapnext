
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

function Header() {
  const router = useRouter()

  function handlelogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
   event.preventDefault()
   if(sessionStorage.getItem('user')){
    sessionStorage.removeItem("user")
   router.push("/")
   }
  }

  return (
    <div className="fixed z-[10] ml-32 w-[calc(100%-128px)] flex items-center justify-between bg-teal-600 shadow-3xl shadow-black">
      <div className="px-5">
        <input
          className="input input-sm bg-transparent input-warning"
          type="email"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-3">
        <div>
          <button className="btn btn-xs btn-error" onClick={handlelogout }>LogOut</button>
        </div>
        <div className="avatar  ">
          <div className="w-12 mr-2">
              <Image width={100} height={100} src="/assets/user.png" alt="Avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
