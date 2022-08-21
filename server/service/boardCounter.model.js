require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.Counter = async (name) => {
    const client = new MongoClient(process.env.DATA_BASE_URL); 
    try {
        const db = client.db(process.env.DATA_BASE_NAME);
        const collection_counter = db.collection('boardCounters');
        var ret = await collection_counter.findOneAndUpdate(
            { _id: name },
            {
               $inc: {
                  seq: 1
               }
            },
            { returnOriginal: false }
         );
         return ret.value.seq;
      
      }catch(err){
        console.log(err);
      }finally {
        await client.close();
      }
}