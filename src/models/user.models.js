import mongoose, { Schema } from "mongoose";
import jwt from"jsonwebtoken"
import bcrypt from"bcrypt"
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
       index: true
    },
   avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
// ab watch history videos pe deendnet hai
watchHistory: [{
      type:Schema.Types.ObjectId,
      ref:"Video"
    }],
password: {
      type: String,
       required: [true,'pass required']// true filed ke dsth custommsg de skte ho
    },
refreshTokens:{
    type:String
}
  }
);
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return ;
    this.password=await bcrypt.hash(this.password,10);
})
userSchema .methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign( // ye return kr de jb bn jaye token to
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign( // ye return kr de jb bn jaye token to
        {
            _id:this._id,
        },                             // y bar bar refresj hotz to bs id leneg yha pe 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);