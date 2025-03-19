
import { useRouter } from "next/router";
import React from "react";

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
    <div className="ml-32 w-[calc(100%-128px)] flex items-center justify-between bg-teal-600 ">
      <div className="px-5">
        <input
          className="input input-bordered input-sm"
          type="email"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-3">
        <div>
          <button className="btn btn-xs" onClick={handlelogout }>LogOut</button>
        </div>
        <div className="avatar p-2">
          <div className="w-14 rounded-full ">
       
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
