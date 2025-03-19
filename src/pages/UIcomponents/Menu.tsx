import Link from "next/link";
import React from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";

import { IoSettings } from "react-icons/io5";


function Menu() {
  return (
    <div className="fixed top-0 flex flex-col justify-between h-full items-center w-32 bg-teal-600 ">
      <div className="p-3 text-3xl border-b-2 ">
        <h1>Report</h1>
      </div>

      <div>
        <ul className="flex flex-col gap-16">
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-5 py-2 hover:bg-amber-400 rounded-xl">
              <FaHome className="text-2xl" />
             <span className="text-sm">Home</span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-5 py-2 hover:bg-amber-400 rounded-xl ">
              <FaHome className="text-2xl" />
             <span className="text-sm">Home</span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-5 py-2 hover:bg-amber-400 rounded-xl ">
              <FaHome className="text-2xl" />
             <span className="text-sm">Home</span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-5 py-2 hover:bg-amber-400 rounded-xl">
              <FaHome className="text-2xl" />
             <span className="text-sm">Home</span> 
            </Link>
          </li>

       
        </ul>
      </div>

      <div >
        <div>
          <div className=" mb-5">
          <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl ">
              <FaUserAlt className="text-2xl" />
             <span className="text-sm">User</span> 
            </Link>
          </div>
        </div>

        <div className="mb-10 ">
        <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl">
              <IoSettings className="text-2xl" />
             <span className="text-sm">Settings</span> 
            </Link>
        </div>

      </div>
    </div>
  );
}

export default Menu;
