import React from "react";


function Ringkasan() {
  return (
   
    <div className="flex flex-col w-64 items-center gap-10">
      <div role="button" className="card w-64 border">
        <div className="card-body">
          <h5 className="card-title">Penjualan</h5>
          <p className="card-text">Lorem ipsum dolor sit a</p>
        </div>
      </div>
      <div className="">
        <div
          className="radial-progress bg-info border-info text-primary-content"
          style={{ "--value": 70 } as React.CSSProperties}
          role="progressbar"
        >
          70%
        </div>
      </div>
      
    </div>
    
  );
}

export default Ringkasan;
