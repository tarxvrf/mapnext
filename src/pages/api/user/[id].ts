

import { PrismaClient } from "@prisma/client";
import { NextApiRequest,NextApiResponse } from "next";


const prisma = new PrismaClient()
export default async function handler(req:NextApiRequest, res: NextApiResponse){

if (req.method === 'GET'){
    const {id} = req.query
    const user= await prisma.map.findUnique({where:{
      id:parseInt(id as string)
    }})
   if(!user){
      return res.status(404).json({message:"User not found"})
   }else{
      return res.status(200).json(user)
   }
}

}