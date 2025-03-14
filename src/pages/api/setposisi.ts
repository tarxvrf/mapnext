import { PrismaClient } from "@prisma/client";
import { NextApiRequest,NextApiResponse } from "next";
import { Middleware } from "./middleware";

const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest, res: NextApiResponse){
 Middleware(req,res)
if (req.method === 'POST'){
   const {nama,harga,lat,lng} = req.body
   const setposisi = await prisma.map.create({
    data:{
        nama: nama as string,
        harga:Number(harga),
        lat:parseFloat(lat),    
        lng:parseFloat(lng),
    }   
   })
   if(!setposisi) return null
   if(!setposisi){
       return res.status(400).json({message:"setposisi not found"})
   }
   if(setposisi){
    return res.status(200).json({message:"User created successfully",setposisi})
   }
   
}



}