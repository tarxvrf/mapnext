import Link from "next/link";
import React from "react";
import {FaUserAlt } from "react-icons/fa";

import { IoSettings } from "react-icons/io5";
import { MdAccountBalance, MdAccountBalanceWallet, MdPermContactCalendar } from "react-icons/md";
import { TbReport } from "react-icons/tb";


function Menu() {
  return (
    <div className="fixed top-0 flex flex-col h-full w-32 bg-teal-600 ">
      <div className="p-3 text-3xl  ">      
        <h1>Report</h1>
      </div>

      <div className="pt-10">
        <ul className="flex flex-col gap-5 ">
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl">
            <TbReport className="text-xl" />
             <span className="text-sm">Report </span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl ">
              <MdAccountBalanceWallet className="text-xl" />
             <span className="text-sm">Sales</span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl ">
              <MdPermContactCalendar className="text-xl" />
             <span className="text-sm">Absensi</span> 
            </Link>
          </li>
          <li>
            <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-2 py-2 hover:bg-amber-400 rounded-xl">
              <MdAccountBalance className="text-2xl" />
             <span className="text-xs">Update Stock</span> 
            </Link>
          </li>

       
        </ul>
      </div>

      <div className="flex flex-col pt-10">
        <div>
          <div className=" mb-5">
          <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl ">
              <FaUserAlt className="text-xl" />
             <span className="text-sm">User</span> 
            </Link>
          </div>
        </div>

        <div className="mb-10 ">
        <Link href="/dashboard/cluster"  className="flex flex-row w-full items-center gap-3 px-3 py-2 hover:bg-amber-400 rounded-xl">
              <IoSettings className="text-xl" />
             <span className="text-sm">Settings</span> 
            </Link>
        </div>

      </div>
    </div>
  );
}

export default Menu;
