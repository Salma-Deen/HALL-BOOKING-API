import express from "express";
import { v4 } from "uuid";

const bookRouter = express.Router();
const booking = [];

// CREATING A ROOM BOOKING
bookRouter.post("/", (req, res) => {
    const {name,date,startTime,endTime} = req.body;
  
   booking.push({
        id:v4(),
        name,
        date,
        startTime,
        endTime
    
    });
    res.status(201).json({ msg: "A booking is created successfully" });
});

// GET ALL BOOKINGS
bookRouter.get("/", (req, res) => {
    res.json(booking);
});

// GET A BOOKING BY ID
 bookRouter.get("/:id", (req, res) => {
     const bookId = req.params.id;
     const book = booking.find(buk => buk.id === bookId);

     if (book) {
         res.json(book);
     } else {
         res.status(404).json({ msg: "Booking not found" });
     }
 });

export default bookRouter;
