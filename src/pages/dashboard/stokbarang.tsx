import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Map {
  id: number;
  nama: string;
  harga: number;
  lat: number;
  lng: number;
}

const fetchdata = async () => {
  const response = await fetch(`/api/getposisi`);
  return response.json();
};

const postdata = async (newdata: Map ) => {
  const response = await fetch(`/api/setposisi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdata),
  });
  return response.json();
};

const deletedata = async (id: number) => {
 await fetch(
    `/api/deleteposisi/${parseInt(id as any)}`,
    {
      method: "DELETE",
    }
  );
};

export default function Stok() {
  const [allproduk, setallproduk] = useState<[]>([]);
  const [nama, setnama] = useState("");
  const [harga, setharga] = useState(0);
  const [lat,setlat] = useState('');
  const [lng,setlng] = useState('');
  const modref = useRef<HTMLDialogElement>(null);
  const [modnama, setmodnama] = useState('');
  const [modharga, setmodharga] = useState(0);
  const [modstok, setmodstok] = useState(0);
  const [id,setid]=useState(0)
  const [gbr,setgbr]= useState('')
  const queryclient = useQueryClient();
  const updatedata = async (id: number) => {
    await fetch(
      `/api/updateposisi/${Number(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama: modnama, harga: modharga, stok: modstok }),
      }
    );
  };

  const { data} = useQuery({
    queryKey: ["allproduk"],
    queryFn: fetchdata,
  });

  const mutation = useMutation({
    mutationFn: postdata,
    mutationKey: ["allproduk"],
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil Ditambahkan",
        icon: "success",
      }),
        queryclient.invalidateQueries();
    },
  });

  const delmutation = useMutation({
    mutationFn: deletedata,
    mutationKey: ["allproduk"],
    onSuccess: () => {
      queryclient.invalidateQueries();
    },
  });

  const updatemutation = useMutation({
    mutationFn: updatedata as any,
    mutationKey: ["allproduk"],
    onSuccess: () => {
      queryclient.invalidateQueries();
    },
    onError: () => {
      Swal.fire({
        title: "Gagal",
        text: "Data Gagal Diupdate",
        icon: "error",
      });
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  function handlesave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ nama: nama, harga: harga, lat: lat ,lng:lng,id:id} as any);
    setnama('')
    setharga(0)
    setlat("")
    setlng("")
  }

  useEffect(() => {
    setallproduk(data);
  }, []);

  function handlehapus(id:any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const hapus = async () => {
            delmutation.mutate(event as any);
          };
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          hapus();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }

  async function sethandleedit(id: any) {
   
    if (modref.current) {
      modref.current.showModal();     
      const item = data.find((item: any) => item.id === id);    
      setmodnama(item.nama) 
      setmodharga(item.harga)   
      setmodstok(item.stok)
      setid(item.id)
    }
    
  }

  async function modsave(id: any) {
    updatemutation.mutate(id);
    if(modref.current){
      modref.current.close()
    }    
  }

  function handleimage(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const file = event.target.files?.[0]
    if(file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg'){
      const reader = new FileReader()
      reader.onloadend = () => {
        setgbr(reader.result as string)
        }
        reader.readAsDataURL(file)
    }else{
      alert('file type not supported must be png file')
    }

  }

  const uploadimage= async(e: React.FormEvent)=>{
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)   
    const ff = formData.get('file')    
    if(ff){
      const {type}= ff as File
      if(type === 'image/jpeg' || type === 'image/png' || type === 'video/mov' || type === 'video/mp4'){
        await fetch('/api/upload', {
          method: 'POST',
          body: ff ,

        })
      }else{
        alert('file type not supported')
      }
    }

  }

  return (
    <div>
      <div className="flex flex-row max-w-lg gap-10 items-center">
        <div></div>
      </div>
      <div className="w-64">
        <form onSubmit={handlesave} encType=" multipart/form-data" className="flex flex-col gap-5">
         <div className="flex flex-col gap-1">
            <label htmlFor="">Nama Cluster</label>
            <input
              type="text"
              placeholder="nama"
              value={nama}
              onChange={(e) => setnama(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Harga</label>
            <input
              type="text"
              placeholder="Rp 0"
              value={harga}
              onChange={(e) => setharga(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            {" "}
            <label htmlFor="">Latitude</label>
            <input
              type="text"
              placeholder="0"              
              value={lat}
              className="w-20"
              onChange={(e) => setlat(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            {" "}
            <label htmlFor="">Longtitude</label>
            <input
              type="text"
              placeholder="0"             
              value={lng}
              className="w-20"
              onChange={(e) => setlng(e.target.value)}
            />
          </div>
          <div>
            <Image src={gbr} alt="image" height={100} width={100} />
            <input type="file" name="file" accept="image/*" onChange={handleimage}></input>
            <button  onClick={uploadimage} className="btn btn-info btn-xs">
            Save Image
          </button>
          </div>
         
          <button type="submit" className="btn btn-info btn-xs">
            Save
          </button>
        </form>
        <ToastContainer />
      </div>

      <div className="overflow-x-auto overflow-y-auto h-[500px] ">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Latitude</th>
              <th>Longitude</th>                          
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data &&
              data.map((item: Map, index: number) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nama}</td>
                  <td>{`${formatCurrency(item.harga)}`}</td>
                  <td>{item.lat}</td>
                  <td>{item.lng}</td>
                 
                  <td className="flex gap-5">
                    <button
                      onClick={(e) => sethandleedit(item.id)}
                      className="btn btn-warning btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handlehapus(item.id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <dialog ref={modref} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
             Silahkan Ubah Data yg diinginkan
            </p>
                <div >
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Nama perumahan</label>
                    <input
                      type="text"
                      value={modnama}                  
                      onChange={(e) => setmodnama((e.target.value))}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Harga</label>
                    <input
                      type="text"
                      value={modharga}
                      onChange={(e) => setmodharga(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    {" "}
                    <label htmlFor="">Latitude</label>
                    <input
                      type="number"
                      value={modstok}                     
                      className="w-20"
                      onChange={(e) => setmodstok(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    {" "}
                    <label htmlFor="">Longtitude</label>
                    <input
                      type="number"
                      value={modstok}                     
                      className="w-20"
                      onChange={(e) => setmodstok(Number(e.target.value))}
                    />
                  </div>

                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn" onClick={(e) => modsave(id)}>
                        Save
                      </button>                     
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
           
          </div>
        </dialog>
      </div>
    </div>
  );
}
