require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.select = async () => {
    const client = new MongoClient(process.env.DATA_BASE_URL); 
    try {
       
        const db = client.db(process.env.DATA_BASE_NAME);
        const collection_post = db.collection('post');
        const sort = {index:-1};
        const options = {
            projection: { user_id:1, title:1, content:1, created_at:1,index:1 }, // 1 = 보임 , 0 = 안보임 
        };
        const result =  await collection_post.find().sort(sort).toArray();
        console.log(result)
        return result;

      }catch(err){
        console.log(err);
      }finally {
        await client.close();
      }
}
