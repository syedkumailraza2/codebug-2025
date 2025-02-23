import StudyMaterial from '../Model/studyMaterial.model.js';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload study material
export const uploadStudyMaterial = async (req, res) => {
    try {
        console.log("🔹 Request Body:", req.body);
        console.log("🔹 Received File:", req.file);

        const { name, format, tech } = req.body;

        if (!name || !format || !tech || !req.file) {
            return res.status(400).json({ message: "All fields (name, format, tech, file) are required!" });
        }

        // Convert Buffer to Base64 for Cloudinary
        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result = await cloudinary.v2.uploader.upload(fileBase64, { resource_type: "auto" });

        const newMaterial = new StudyMaterial({
            name,
            format,
            url: result.secure_url,
            tech
        });

        await newMaterial.save();
        res.status(201).json({ message: "Study material uploaded successfully", data: newMaterial });

    } catch (error) {
        console.error("❌ Error uploading file:", error);
        res.status(500).json({ message: "Error uploading study material", error: error.message });
    }
};


// Get all study materials
export const getAllStudyMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study materials", error: error.message });
    }
};

// Get a single study material by ID
export const getStudyMaterialById = async (req, res) => {
    try {
        const material = await StudyMaterial.findById(req.params.id);
        if (!material) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study material", error: error.message });
    }
};

// Update study material
export const updateStudyMaterial = async (req, res) => {
    try {
        const updatedMaterial = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMaterial) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json({ message: "Study material updated successfully", data: updatedMaterial });
    } catch (error) {
        res.status(500).json({ message: "Error updating study material", error: error.message });
    }
};

// Delete study material
export const deleteStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        // Find study material by ID
        const material = await StudyMaterial.findById(id);
        if (!material) {
            return res.status(404).json({ message: "Study material not found" });
        }

        // Extract the Cloudinary public_id from the URL
        const fileUrl = material.url;
        const publicId = fileUrl.split('/').pop().split('.')[0]; // Extracts the file ID

        // Determine the resource type (default to 'raw' for PDFs & docs)
        const resourceType = fileUrl.includes("/image/") ? "image" : "raw";

        // Delete file from Cloudinary
        await cloudinary.v2.uploader.destroy(publicId, { resource_type: resourceType });

        // Delete the document from MongoDB
        await StudyMaterial.findByIdAndDelete(id);

        res.status(200).json({ message: "Study material deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting study material", error: error.message });
    }
};

// Search study materials
export const searchStudyMaterials = async (req, res) => {
    try {
        const query = req.query.query;
        const materials = await StudyMaterial.find({ 
            $or: [{ name: { $regex: query, $options: "i" } }, { tech: { $regex: query, $options: "i" } }] 
        });

        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error searching study materials", error: error.message });
    }
};
