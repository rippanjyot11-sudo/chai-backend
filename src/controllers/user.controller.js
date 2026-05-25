import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser=asyncHandler(async(req,res)=>{
    res.status(200).json({                                 // ye ek method bnayaa hai hmne user ko register kiya hai
        message:"ok"
    })
})
export {registerUser}
