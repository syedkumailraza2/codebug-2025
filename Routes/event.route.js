import { Router } from "express";
import { upload } from "../Middleware/multer.middleware.js";
import { createEvent, getanEvent, getEvents, updateEvent } from "../Controller/event.controller.js";

const eventRouter = Router()

eventRouter.get('/events',getEvents)
eventRouter.post('/create',upload.fields([{ name: "url", maxCount: 1 }]), createEvent)
eventRouter.put('/:id',upload.fields([{ name: "url", maxCount: 1 }]), updateEvent)
eventRouter.get('/:id',getanEvent)
eventRouter.delete('/:id',getanEvent)


export { eventRouter }
