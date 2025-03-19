import React from "react";
import { validasischema } from "@/validasi/validasischema";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();  
  const handlesubmit = async () => {
    if (!formik.values.email && !formik.values.password) {
      return null;
    }
    if(formik.values.email ==="admin@mail" && formik.values.password ==="admin123"){
      sessionStorage.setItem("user",JSON.stringify({name:"admin@mail"}))
      router.push("/dashboard")
      Swal.fire({
        title: "Good job!",
        text: "Login berhasil",
        icon: "success"
      });
    }else{
      Swal.fire({
        title: "Upps!",
        text: "Password atau email anda salah",
        icon: "error"
      });
    }  
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validasischema,
    onSubmit: handlesubmit,
  });

  function handlechange(event: React.FormEvent) {
    const { name, value } = event.target as HTMLInputElement;
    formik.setFieldValue(name, value);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card border p-10">
        <div className={`titlelogin text-center`}> Login </div>
        <p className="text-center text-md lg:text-xl">
          Silahkan Login terlebih dahulu
        </p>
        <br />
        {/* ------Form Inputan------ */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          {/* ----Input Text*/}
          <input
            className={`inputtext `}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handlechange}
          />
          {!formik.isValid && (
            <span className="text-red-400 font-bold">
              {formik.errors.email}
            </span>
          )}
          <input
            className={`inputtext `}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
          />
          {!formik.isValid && (
            <span className="text-red-400 font-bold">
              {formik.errors.password}
            </span>
          )}
          {/* End ----Input Text*/}

          {/* ----Login OAUTH------*/}

          {/* ----Login OAUTH------*/}
          <div className="flex flex-col gap-5">
            
            <button type="submit" className="btn btn-sm btn-info">
              proses
            </button>
          </div>
        </form>
        {/* ------Form Inputan------ */}
      </div>
    </div>
  )
}

export default Login;
