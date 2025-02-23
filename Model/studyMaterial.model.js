import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    format: { type: String, required: true },
    url: { type: String, required: true },
    tech: { type: String, required: true },
}, { timestamps: true });

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
export default StudyMaterial;
