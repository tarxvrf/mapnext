import React, { useEffect, useState } from "react";
import MyDatePicker from "../UIcomponents/DatePicker";
import MyDateRange from "../UIcomponents/RangeDatePicker";
import Swal from "sweetalert2";

export default function Report() {
const [allproduk, setallproduk] = useState<[]>([]);
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};
  useEffect(() => {
    const data = async () => {
      const response = await fetch("https://api-test.tulus-dev.my.id/api/allproduk");
      const allproduk = await response.json();
      setallproduk(allproduk);
    };
    data();
  }, []);
  
  function handleclick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
   event.preventDefault();
 
  }

  return (
    <div>
      <div className="flex flex-row max-w-lg gap-10 items-center">
      <div className="">
        
        <select  className="select  select-sm select-info w-full max-w-sm ">
        {allproduk.map((item:any,index)=>
         <option key={index} value={item.id}>{item.nama}</option>
        )}
        </select>
      </div>
      <div>
        <MyDatePicker />
      </div>
      <div>
        <button onClick={handleclick} className="btn btn-info btn-xs">Search</button>
      </div>
      </div>

      <div className="overflow-x-auto overflow-y-scroll h-[800px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

              <th>id</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>createdAt</th>
              <th>updateAt</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allproduk.map((item:any,index)=> 
            <tr key={index}>                      
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{`${formatCurrency(item.harga)}`}</td>
              <td>{item.stok}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
               </tr>
              )}           
          </tbody>
        </table>
      </div>

      
      <div></div>
    </div>
  );
}
