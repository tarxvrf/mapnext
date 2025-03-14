import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';




// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(mod => mod.ImageOverlay), { ssr: false });
interface Position {
  lat: number;
  lng: number;
}
type  Props={
  nama:string;
  harga:number;
  lat: number;
  lng: number;
}
const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<Position>({ lat: 51, lng: 20.09 });
  const [datas,setdatas]= useState<Props[]>([])
  
  useEffect(() => {
    // Here you can update the position dynamically if needed
    const data = async () => {
      const response = await fetch('/api/getposisi');
      const allproduk = await response.json();
      setdatas(allproduk);
    };
    data();
    setPosition({ lat: 51.506, lng: -0.08 });
  }, []);
 

  return (
    <MapContainer   attributionControl={false} center={[position.lat, position.lng]} zoom={14} className='w-full h-[600px]'>
     
     {datas.map(((item,index)=>
    <Marker  key={index} position={[item.lat, item.lng]}>
     <Popup >{item.nama} <p>{item.harga}</p></Popup>
     </Marker> ))
      }
    
      <ImageOverlay     
        url="/depok.png"  // Path to your image
        bounds= {[[51.491, -0.12],[51.52, -0.08]]}  // Northeast corner (Lat, Lng)}  // Define the bounds to place the image on the map
       />
       
       
    </MapContainer>
  )
}

export default MapComponent;
