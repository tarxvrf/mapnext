import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Map {
  id: number;
  nama: string;
  harga: number;
  lat: string;
  lng: string;
}

const fetchdata = async () => {
  const response = await fetch(`/api/getposisi`);
  return response.json();
};

const postdata = async (newdata: Map) => {
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
  await fetch(`/api/deleteposisi/${id}`, {
    method: "DELETE",
  });
};

export default function Cluster() {
  const [nama, setnama] = useState("");
  const [harga, setharga] = useState(0);
  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");
  const modref = useRef<HTMLDialogElement>(null);
  const [modnama, setmodnama] = useState("");
  const [modharga, setmodharga] = useState(0);
  const [modlat, setmodlat] = useState("");
  const [modlng, setmodlng] = useState("");
  const [id, setid] = useState(0);
  const [gbr, setgbr] = useState("");
  const queryclient = useQueryClient();

  const updatedata = async (id: number) => {
    await fetch(`/api/updateposisi/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: modnama,
        harga: modharga,
        lat: modlat,
        lng: modlng,
      }),
    });
  };

  const { data } = useQuery({
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
      }).then(() => {
        queryclient.invalidateQueries();
      });
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
    mutationFn: updatedata,
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
    mutation.mutate({ nama: nama, harga: harga, lat: lat, lng: lng, id: id });
    setnama("");
    setharga(0);
    setlat("");
    setlng("");
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function handlehapus(id: number) {
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
            delmutation.mutate(id);
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

  async function sethandleedit(id: number) {
    if (modref.current) {
      modref.current.showModal();
      const item = data.find((item: Map) => item.id === id);
      setmodnama(item.nama);
      setmodharga(item.harga);
      setmodlat(item.lat);
      setmodlng(item.lng);
      setid(item.id);
    }
  }

  async function modsave(id: number) {
    updatemutation.mutate(id);
    if (modref.current) {
      modref.current.close();
    }
  }


  return (
    <div className="px-10 py-10 overflow-y-auto overflow-x-auto">
      <div className="flex justify-center text-2xl font-bold items-center">
        <div>
          <h1 className="text-center">Pengelolaan Cluster</h1>
        </div>
      </div>
      <div className="w-64 pt-10">
        <form
          onSubmit={handlesave}
          encType=" multipart/form-data"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label>Nama Cluster</label>
            <input
              className="border rounded-xl py-1 pl-2"
              type="text"
              placeholder="nama"
              value={nama}
              onChange={(e) => setnama(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Harga</label>
            <input
              className="border rounded-xl py-1 pl-2"
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
              className="border rounded-xl py-1 pl-2"
              onChange={(e) => setlat(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            {" "}
            <label htmlFor="">Longtitude</label>
            <input
              className="border rounded-xl py-1 pl-2"
              type="text"
              placeholder="0"
              value={lng}
              onChange={(e) => setlng(e.target.value)}
            />
          </div>        

          <button type="submit" className="btn btn-info btn-xs">
            Save
          </button>
        </form>
        <ToastContainer />
      </div>

      <div className="overflow-x-auto overflow-y-auto h-[500px] pt-10 ">
        <table className="table border ">
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
                      onClick={() => sethandleedit(item.id)}
                      className="btn btn-warning btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlehapus(item.id)}
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
            <p className="py-4">Silahkan Ubah Data yg diinginkan</p>
            <div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Nama perumahan</label>
                <input
                  type="text"
                  value={modnama}
                  onChange={(e) => setmodnama(e.target.value)}
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
                  type="text"
                  value={modlat}
                  className="w-20"
                  onChange={(e) => setmodlat(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                {" "}
                <label htmlFor="">Longtitude</label>
                <input
                  type="text"
                  value={modlng}
                  className="w-20"
                  onChange={(e) => setmodlng(e.target.value)}
                />
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn" onClick={() => modsave(id)}>
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
