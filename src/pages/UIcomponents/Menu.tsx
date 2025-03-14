import Link from "next/link";
import React from "react";
import { FaBox, FaHome, FaUserAlt } from "react-icons/fa";

import { GrDeliver } from "react-icons/gr";
import { HiShoppingBag } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";

function Menu() {
  return (
    <div className="fixed flex flex-col justify-between h-full items-center w-32 bg-slate-900 ">
      <div className="p-3 text-3xl border-b-2 ">
        <h1>Report</h1>
      </div>

      <div>
        <ul className="flex flex-col gap-16">
          <li className="flex flex-col btn btn-ghost ">
            <Link href="/dashboard">
              <FaHome className=" text-4xl" />
              Home
            </Link>
          </li>

          <li className="flex flex-col btn btn-ghost ">
            <Link href="/dashboard/report">
              <TbReportSearch className=" text-4xl" />
              Report
            </Link>
          </li>

          <li className="flex flex-col btn btn-ghost ">
            <Link href="/dashboard/deliver">
              <GrDeliver className=" text-4xl" />
              <span>Deliver</span>
            </Link>
          </li>

          <li className="flex flex-col btn btn-ghost">
            <Link href="/dashboard/sales">
              <HiShoppingBag className=" text-4xl" />
              <span>Sales</span>
            </Link>
          </li>
          <li className="flex flex-col btn btn-ghost">
            <Link href="/dashboard/stokbarang">
            <FaBox className=" text-4xl p-1" />
              <span>Stok</span>
            </Link>
          </li>
        </ul>
      </div>

      <div >
        <div>
          <div className=" mb-5 btn btn-ghost ">
            <FaUserAlt className="text-4xl " />
          </div>
        </div>

        <div className="mb-10 btn btn-ghost ">
          <IoSettings className="text-4xl " />
        </div>

      </div>
    </div>
  );
}

export default Menu;
