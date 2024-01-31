

export const Validation=(req,res,next)=>{
    const data = req.body
    const userId = req.user.userId
    const { homeName } = data
    if (!homeName) {
        return res.send({ response_code: 2, response_message: "Home name is missing", response_code: 1 });
    }   else{
        next()
    }
}