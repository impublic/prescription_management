import jwt  from "jsonwebtoken";
const authDoctor = async(req,res,next)=>{
    // user authentication middleware
    try{
const{dtoken}= req.headers;
if(!dtoken){
return res.json({success:false,message:'Not authorized Login again'});
}

const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
// Log the entire decoded token and the docId specifically
 console.log("Decoded Token:", token_decode);
 console.log("docId:", token_decode.id);
req.body.docId = token_decode.id
next()
}catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
export default authDoctor;