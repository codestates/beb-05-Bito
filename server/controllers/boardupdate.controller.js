const boardmodel = require("../service/board/update.model");

exports.update_post = async(req,res,next) =>{
    try{
        const result = await boardmodel.update(req);
        if(result.modifiedCount == 1){
            res.status(200).send({
                "message":1,
                "data" : "success"
            });
        }else{
            res.status(200).send({
                "message":0,
                "data": "fail"
            });
        }
        
    } catch(e){
        throw Error(e)
    }
}