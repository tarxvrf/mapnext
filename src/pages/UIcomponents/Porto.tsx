import Image from "next/image";
import React from "react";
import { poppins } from "@/fonts/fonts";
import Link from "next/link";

function Porto() {
  return (
    <div className="grid grid-col-2  sm:flex sm:flex-row  justify-center gap-10 py-10 px-20 bg-amber-700 h-[500px] ">
      <div className="w-96 border hover:scale-105 rounded-xl shadow-2xl shadow-gray-700">
        <Link href={"/casandra"}>
        <Image                   
          height={300}
          width={500}
          className="hover:cursor-pointer rounded-xl"
          src={"/assets/casandra.png"}
          alt={"casandra"}
        />
        </Link>
        <div className={`${poppins.className} px-2 pt-2`}>
          <h1 className="text-2xl font-bold pb-2">Cluster Casandra </h1>
          <p>Design dengan gaya eropa yang futuristik dan elegan</p>
        </div>
      </div>
      <div className="w-96 border hover:scale-105  rounded-xl shadow-2xl shadow-gray-700">
      <Link href={"/magento"}>
        <Image
          height={300}
          width={500}
          className="hover:cursor-pointer rounded-xl h-[250px]"
          src={"/assets/magento.png"}
          alt={"casandra"}
        />
        </Link>
        <div className={`${poppins.className} px-2 pt-2`}>
          <h1 className="text-2xl font-bold pb-2">Cluster Magento </h1>
          <p>Design dengan gaya eropa yang futuristik dan elegan</p>
        </div>
      </div>
    </div>
  );
}

export default Porto;
