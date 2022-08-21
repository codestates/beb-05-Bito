const boardmodel = require("../service/board/select.model");

exports.select_get = async(req,res,next) =>{
    try{
        const result = await boardmodel.select(req);
        if(result != null){
            res.status(200).send({
                "message":1,
                "data" : result
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