import Event from "../Model/event.model.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

const createEvent = async (req, res) => {
    try {
        //get user input and validate
        const { name, date, description } = req.body

        if (!name) {
            res.status(400).json({ message: "Name is Required" });
        }

        if (!date) {
            res.status(400).json({ message: "Date is Required" });
        }
        if (!description) {
            res.status(400).json({ message: "Description is Required" });
        }

        //add file to cloudinary
        const posterBuff = req.files?.url?.[0]?.buffer;
        if (!posterBuff) {
            return res.status(400).json({ message: "Poster is required" });
        }

        const poster = await uploadOnCloudinary(posterBuff)
        if (!poster) {
            return res.status(400).json({ message: "Failed to upload poster" });
        }

        //save data to db and give response
        const event = await Event({
            name,
            date,
            description,
            url:poster.secure_url
        })

        await event.save();

        console.log(event);
        res.status(200).json({
            message: "Event added successfully!",
            event
        });

    } catch (error) {
        console.log(`Error while creating an Event: ${error}`);

    }
}

const updateEvent = async (req,res) => {
    try {
        const { name, date, description } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.name = name || event.name;
        event.date = date || event.date;
        event.description = description || event.description;
        if (req.files?.url?.[0]?.buffer) {
            const uploadedPoster = await uploadOnCloudinary(req.files.url[0].buffer);
            if (uploadedPoster) event.poster = uploadedPoster.secure_url;
        }

        await event.save();

        res.status(200).json({
            message: "Event updated successfully!",
            event
        });

    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const deleteEvent = async (req,res)=>{
    try {
        const eventId = req.params.id
        const event = await Event.findById(eventId)
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        //delete event
        await Event.deleteOne({"_id": eventId})
        
        //notify user
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log("Error while Deleteing event");
        res.status(500).send({message:"Internal Server Error"});
    }
}

const getEvents = async (req,res)=>{
    try {
        const events = await Event.find()
        res.json(events);
    } catch (error) {
        console.log( "Error while getting Events ",error);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const getanEvent = async (req,res)=>{
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            console.log("Event not Found");
            
            res.status(400).send({message:"Event not Found"});
        }
        res.json(event);
    } catch (error) {
        console.log( "Error while getting Events ",error);
        res.status(500).send({message:"Internal Server Error"});

        
    }
}

export { createEvent, updateEvent, deleteEvent, getEvents, getanEvent }