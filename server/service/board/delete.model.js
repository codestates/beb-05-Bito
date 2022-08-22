require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.delete = async (req) => {
    const client = new MongoClient(process.env.DATA_BASE_URL); 
    try {
        const _index = parseInt(req.params.id);
        const db = client.db(process.env.DATA_BASE_NAME);
        const collection_post = db.collection('post');
        const query = {
            index: _index,
        }
        const result =  await collection_post.deleteOne(query);
        return result;

      }catch(err){
        console.log(err);
      }finally {
        await client.close();
      }
}
