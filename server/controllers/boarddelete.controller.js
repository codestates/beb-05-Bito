const boardmodel = require("../service/board/delete.model");

exports.delete_get = async(req,res,next) =>{
    try{
        const result = await boardmodel.delete(req);
        if(result.deletedCount == 1){
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