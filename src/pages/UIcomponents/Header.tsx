import React from "react";

function Header() {
  return (
    <div className="fixed  ml-32 w-[calc(100%-128px)] flex items-center justify-between border bg-slate-400 ">
      <div className="px-5">
        <input
          className="input input-bordered input-sm"
          type="email"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-3">
        <div>
          <button className="btn btn-xs">LogOut</button>
        </div>
        <div className="avatar p-2">
          <div className="w-14 rounded-full ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
