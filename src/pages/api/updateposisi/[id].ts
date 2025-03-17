import { PrismaClient } from "@prisma/client";
import { NextApiRequest,NextApiResponse } from "next";
import { Middleware } from "../middleware";


const prisma = new PrismaClient()
export default async function handler(req:NextApiRequest, res: NextApiResponse){
Middleware(req,res)
if (req.method === 'PATCH'){
    const {id} = req.query
    const {nama,harga,lat,lng}= req.body
    const data = await prisma.map.update({where:{
      id:Number(id)
    },
    data:{
        nama:nama as string,
        harga:Number(harga),
        lat:parseFloat(lat),
        lng:parseFloat(lng)
    }
    }
    )
    if(!data){
        return res.status(404).json({message:"data gagal"})
     }else{
        return res.status(200).json({message:'data berhasil diubah',data})
     }
   
}

}