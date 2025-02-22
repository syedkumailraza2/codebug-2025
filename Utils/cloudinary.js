import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({ 
    cloud_name: "dcbwkpsu7", 
    api_key: "279696937157579", 
    api_secret: "D7HXW_MbDBm8lqEAumeKGROT8L4"
});


const uploadOnCloudinary = async (buffer) => {
    try {
        console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
console.log(`Cloud API: ${process.env.CLOUDINARY_API_KEY}`);
console.log(`Cloud Secret: ${process.env.CLOUDINARY_API_SECRET}`);
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(buffer);
        });
    } catch (error) {
        console.log('Error while uploading file on cloudinary: ',error);
        
    }
};
export { uploadOnCloudinary };