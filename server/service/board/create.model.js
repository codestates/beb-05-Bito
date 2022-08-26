require("dotenv").config();
const { MongoClient } = require("mongodb");
const Counter = require("./../boardCounter.model");

exports.create = async (req) => {
    const client = new MongoClient(process.env.DATA_BASE_URL); 
    console.log(process.env.DATA_BASE_URL)
    try {
        const { user_id, title, content } = req.body

        var today = new Date();
        today.setHours(today.getHours() + 9);
        const date = today.toISOString().replace('T', ' ').substring(0, 19);
        const db = client.db(process.env.DATA_BASE_NAME);
        const collection_post = db.collection('post');
        const _counter = await Counter.Counter("noticeId");
        console.log(_counter);

        const doc = {
          user_id : user_id,
          title : title,
          content : content,
          created_at : date,
          index: _counter
        }
        const result = await collection_post.insertOne(doc);
        return result;
     
      }catch(err){
        console.log(err);
      }finally {
        await client.close();
      }
}
