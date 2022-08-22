const boardmodel = require("../service/board/create.model");

exports.create_post = async (req,res,next) =>{
    try{
        const result = await boardmodel.create(req);
        if(result.acknowledged == true){
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