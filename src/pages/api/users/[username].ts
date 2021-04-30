import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'

let cachedDb: Db = null

const connectToDatabase = async (uri: string) => {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = client.db('studentguildusers')

  cachedDb = db

  return db
}

export default async function (request: VercelRequest, response: VercelResponse) {
  if (request.method === 'GET') {
    const { username } = request.query
    try {
      const db = await connectToDatabase(process.env.MONGODB_URI)

      const collection = db.collection('users')

      const user = await collection.findOne({ username: username })
      return response.status(200).json({ success: true, user: user || {} })
    } catch (e) {
      console.log('FAILED GET', e)
      return response.status(400).json({ success: false })
    }
  } else if (request.method === 'POST') { 
    try {
        const {
          username,
          currentMoney,
          inventoryArmor,
          inventorySword,
          inventoryHelmet,
          inventoryBackground,
          equipedArmor,
          equipedSword,
          equipedHelmet,
          equipedBackground,
        } = request.body

        const db = await connectToDatabase(process.env.MONGODB_URI)
      
        const collection = db.collection('users')

        if(equipedArmor){
            await collection.findOneAndUpdate({ username: username },{
              $set: {
                equipedArmor,
              }
            })
          }else if(equipedSword){
            await collection.findOneAndUpdate({ username: username },{
              $set: {
                equipedSword,
              }
            })
          }else if(equipedHelmet){
            await collection.findOneAndUpdate({ username: username },{
              $set: {
                equipedHelmet,
              }
            })
          }else if(equipedBackground){
            await collection.findOneAndUpdate({ username: username },{
              $set: {
                equipedBackground,
              }
            })
          }else if(currentMoney){
            await collection.findOneAndUpdate({ username: username },{
              $set: {
                currentMoney,
              }
            })
          }else {
            await collection.findOneAndUpdate({ username: username },{
              $addToSet: {
                inventoryArmor,
                inventorySword,
                inventoryHelmet,
                inventoryBackground,
              }
            })
      }
        
        return response.status(201).json({ success: true })
      }
         catch (e) {
          return response.status(400).json({ success: false })
        }
       } else {
    return response
      .status(200)
      .json({ success: false, message: 'teste' })
  }
}