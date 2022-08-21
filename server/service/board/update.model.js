require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.update = async (req) => {
    const client = new MongoClient(process.env.DATA_BASE_URL); 
    try {
        const { index, title, content } = req.body;
        const db = client.db(process.env.DATA_BASE_NAME);
        const collection_post = db.collection('post');
        
        const query = {
            'index': parseInt(index)
        }
        const set = {
            $set:{
                'title': title,
                'content': content
            }
        }
        const result =  await collection_post.updateOne(query,set);
        console.log(result)
        return result;

      }catch(err){
        console.log(err);
      }finally {
        await client.close();
      }
}