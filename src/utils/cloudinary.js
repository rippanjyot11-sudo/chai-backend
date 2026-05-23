import {v2} from "cloudinary"
import { hasSubscribers } from "diagnostics_channel";
import fs from "fs"
cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });


    const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        )

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ", response.url);

        return response;

    } catch (error) {
// manlo file upload nhi hui to hm us file ko server se hata denge taki usse bhut sari malicious files  na rh jaye 
//server pe to hm unhe unlink rk drte hai//
fs.unlinkSync(localFilePath)// remobe locally saved temporaray file as as the upload opertaion  got failed
return null;
    }
}

export {uploadOnCloudinary}