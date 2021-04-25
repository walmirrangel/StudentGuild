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
  } else {
    return response
      .status(200)
      .json({ success: true, message: 'teste' })
  }
}