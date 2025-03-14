"use client";
import React, { useState } from "react";
import { MdOutlineDescription, MdOutlineSubtitles } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

function Sales() {
  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')
  const [desk, setdesk] = useState('')

  const notify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch('http://localhost:3000/api/postuser', {
      method: 'POST',
      body: JSON.stringify({ username: user, password: pass }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const response = await data.json()
    if (response) {
      toast.success('User created successfully', {
        position: "top-right",
      })

    } else {
      toast.error('User Gagal terbentuk', {
        position: "top-right",
      })

    }

  };

  return (
    <div className="flex justify-center mt-[10%] ">
      <div className="card sm:w-8/12 h-[500px] max-w-sm border">
        <div className="card-body">
          <form onSubmit={notify} className="flex flex-col gap-5 h-full">
            <label className="input input-bordered flex items-center gap-2">
              <MdOutlineSubtitles />
              <select className="select  select-sm  w-full max-w-xs " onChange={(e) => setuser(e.target.value)}>
                <option disabled selected>
                  pilih produk
                </option>
                <option>English</option>
                <option>Japanese</option>
                <option>Italian </option>

              </select>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <MdOutlineSubtitles />
              <input type="text" className="grow" placeholder="Judul Produk" onChange={(e) => setpass(e.target.value)} />
            </label>
            <textarea className="bg-transparent h-full w-full resize-none border rounded-xl p-2" placeholder="Deskripsi" onChange={(e) => setdesk(e.target.value)} />
            <button type="submit" className="btn btn-sm btn-info">Save</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Sales;
