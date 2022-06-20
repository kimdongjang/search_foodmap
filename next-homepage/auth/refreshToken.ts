import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default async(req:NextApiRequest, res:NextApiResponse) => {
  const {headers} = req;
  try{
    const {data, headers:returnedHeaders} = await axios.post('/auth/refresh-token', // refresh token Node.js server path
    undefined,
    {
      headers,
    },
    )
    // update header on requester using headers from node.js server response
    Object.keys(returnedHeaders).forEach(key => {
      res.setHeader(key, returnedHeaders[key])
    })

    res.status(200).json(data)
  }

  catch (error){
    res.send(error)
  }    
}