import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import upload from "../middlewares/multer.middleware.js";
import { ApiResponse } from "../utils/apiResponse.js";;
const registerUser=asyncHandler(async(req,res)=>{
   console.log(req.files);
console.log(req.files?.avatar);
console.log(req.files?.avatar?.[0]?.path);
console.log("REQ FILES:", req.files);



   const{fullname, email,username,password}=req.body
   console.log("email:",email);
   if(
    [fullname, email, username, password].some((field)=>
        field?.trim()==="")
   ){
    throw new ApiError(400, "all fields are required")
   }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }]
   });



   if (existedUser) {
      throw new ApiError(
         409,
         "user with email or username already exists"
      );
   }

   

   const avatarLocalPath=req.files?.avatar?.[0]?.path;
   const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
console.log(req.files)
// to hm normal if else se check krenge coverimage ko
//let coverImageLocalPath;
//if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
   //coverImageLocalPath=req.files.coverImage[0].path
//}
   if(!avatarLocalPath){
    throw new ApiError(400,"AvTAR FILE IS REQUIRED")
   }
     // ab cloudnary pe upload krna hia to bs ek method use kro aur ho jayega upload
//  and ye time lega upload hone mai to use await mtlb awiat kro aage ke code mai mt jao jb tk ye not upload//
     const avatar=await uploadOnCloudinary(avatarLocalPath)
     console.log("CLOUDINARY:", avatar);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)
  //  ab hm check krre hai ki aggr avatar nhi hai to error do
  if(!avatar){
    throw new ApiError(400,"avatar file is required ")
  }


  // 7- step since databse se baat kre t time lgega aulsodatabse in another cotinient
  // models databse se baat krne ka jariya hai 
 const user=await User.create({
    fullname,
    avatar:avatar.url,// ye to cloudnary se aayega response mai
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
  })
// ab hm ye check kr skte hai ki user bna hai ya nhi empty to nhi haikhi and hme step-8
// hme passsword and refersh tokem hatana ahai// mtlb jo user mila hai uska ye hatao 
//step-8//
const createUser=await User.findById(user._id).select(
    "-password -refreshToken "
)
// ab checek krlo ki agr craeted user nhi hai to error thorw  step-9
if(!createUser){
    throw new ApiError(500,"something wnet wrong while registeirng user")
}
// step 10 agr user bn gya to repsonse bhj do fir hm cjahte hai ki prolpeoly stsructred response jaye
// so we use api response // yha object mai 2md paarmetr mera data hai jo ki mera user hai 
return res.status(201).json(
    new ApiResponse(200,createUser,"user registed succesfully") // ye user ko return hoga yani frontend mai 
)
});
export {registerUser};

