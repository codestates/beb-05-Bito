exports.main_get = async(req,res,next) =>{
    try{
        res.status(200).send("Hello world")
    } catch(e){
        throw Error(e)
    }
}