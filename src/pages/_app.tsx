import Frame from "@/Frame/Frame";
import Framedashboard from "@/Frame/Framedashboard";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'leaflet/dist/leaflet.css'; // Import Leaflet's default CSS
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const pathnames = usePathname()
  const router = useRouter()
  
  useEffect(()=>{
    const getsesion = sessionStorage.getItem("user")
    if(!getsesion && pathnames.startsWith("/dashboard")){
      router.push("/login")
    }
  })
  return (
  <div>    
    {pathnames.startsWith("/dashboard") ? <Framedashboard><QueryClientProvider client={new QueryClient}><Component {...pageProps} /></QueryClientProvider></Framedashboard>:
        <Frame><QueryClientProvider client={new QueryClient}><Component {...pageProps} /></QueryClientProvider></Frame>
    }

  </div>
 

 )
}
