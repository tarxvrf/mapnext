import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";



// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
//const TileLayer = dynamic(
  //() => import("react-leaflet").then((mod) => mod.TileLayer),
  //{ ssr: false }
//);
const CircleMarker = dynamic(()=>import ('react-leaflet').then((mod)=>mod.CircleMarker), { ssr: false });
//const Marker = dynamic(
  //() => import("react-leaflet").then((mod) => mod.Marker),
  //{ ssr: false }
//);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const ImageOverlay = dynamic(
  () => import("react-leaflet").then((mod) => mod.ImageOverlay),
  { ssr: false }
);
const SvgOverlay = dynamic(
  () => import("react-leaflet").then((mod) => mod.SVGOverlay),
  { ssr: false }
);
interface Position {
  lat: number;
  lng: number;
}
type Props = {
  nama: string;
  harga: number;
  lat: number;
  lng: number;
};


const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<Position>({ lat: 51, lng: 20.09 });

 
  const fetchdata= async () => {
    const response = await fetch("/api/getposisi");
    return response.json();    
  };

  const {data} = useQuery({
    queryKey: ["allproduk"],
    queryFn:fetchdata,
    refetchInterval:10000
  })
  
  useEffect(() => {
    // Here you can update the position dynamically if needed
    fetchdata()
    setPosition({ lat: 51.505, lng: -0.09 })
  }, [])
  
  //const customIcon = new Icon({
    //iconUrl: '/markericon.png', // Path to your custom image
    //iconSize: [8,7], // Size of the icon
    //iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    //popupAnchor: [0, -32], // Point from which the popup will open
    //iconRetinaUrl:'/marketicon.png'
  //});
  
  return (
    <MapContainer
      attributionControl={false}
      center={[position.lat, position.lng]}
      zoom={14}
      className="w-full h-[600px] "
    >
      {data && data.map((item:Props, index:number) => (
       <CircleMarker  key={index} center={[item.lat, item.lng]} radius={4} fillColor="black">
          <Popup>
            {item.nama} <p>{item.harga}</p>
          </Popup>
        </CircleMarker>
      ))}
      <SvgOverlay
       
        bounds={[
          [51.511, -0.10],//atur posisi rect
          [51.521, -0.08],//atur posisi
        ]}
      > <rect x="0" y="10" width="100%" height="50%" fill="white" />
    
        <text x="10" y="20"   fill="black" textAnchor="start" dominantBaseline="middle"  fontSize={10}>
          Total terjual: 20unit</text>
        <text></text>
        <text x="10" y="40"   fill="black" textAnchor="start" dominantBaseline="middle"  fontSize={10}>
          Penjualan= 20%</text>
        <text></text>
        <text x="10" y="60"   fill="black" textAnchor="start" dominantBaseline="middle"  fontSize={10}>
         stok ready= 20%</text>
        <text></text>      
      </SvgOverlay>
    
      <ImageOverlay
        url="/magenta.png" // Path to your image
        bounds={[
          [51.491, -0.12],
          [51.52, -0.08],
        ]} // Northeast corner (Lat, Lng)}  // Define the bounds to place the image on the map
      />
      
       
    </MapContainer>
  )
}

export default MapComponent
