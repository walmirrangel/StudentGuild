import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url';

let cachedDb: Db = null

const connectToDatabase = async (uri: string) => {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async function (request: VercelRequest, response: VercelResponse) {
  if (request.method === 'POST') { 
    try {
        const {
          username,
          password,
          nickname,
          level,
          currentExperience,
          currentLife,
          currentStamina,
          currentMoney,
          challengesCompleted,
        } = request.body

        const db = await connectToDatabase(process.env.MONGODB_URI)
      
        const collection = db.collection('users')

        const update = await collection.findOne({ username: username })

        if (update) {
          await collection.updateOne(
            { _id: update._id },
            {
              $set: {
                username,
                level,
                currentExperience,
                currentLife,
                currentStamina,
                currentMoney,
                challengesCompleted,
              }
            }
          )
        } else {

          await collection.insertOne({
            username,
            password,
            nickname,
            level,
            currentExperience,
            currentLife,
            currentStamina,
            currentMoney,
            challengesCompleted,
          })
        }
        return response.status(201).json({ success: true })
    } catch (e) {
      return response.status(400).json({ success: false })
    }
  } else if (request.method === 'GET') {
    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('users')

    return new Promise((resolve, reject) => {
      collection
        .find()
        .sort({ level: -1 })
        .toArray((err, docs) => {
          if (err)
            return response
              .status(400)
              .json({ success: false, error: reject(err) })

          return response.status(200).json({ success: true, users: docs })
        })
    })
  } else {
    return response
      .status(200)
      .json({ success: true, message: 'teste' })
  }
}