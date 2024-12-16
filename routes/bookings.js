import express from "express";
import { v4 } from "uuid";

const bookRouter = express.Router();
const booking = [];

// Helper function to check if the room is already booked for the same date and time
const isRoomBooked = (roomId, date, startTime, endTime) => {
    return booking.some(book => {
        return book.roomId === roomId && // Match the room ID
            book.date === date &&        // Match the booking date
            (
                // Check if the new booking's time conflicts with an existing booking
                (startTime >= book.startTime && startTime < book.endTime) ||  // Overlaps at start time
                (endTime > book.startTime && endTime <= book.endTime) ||    // Overlaps at end time
                (startTime <= book.startTime && endTime >= book.endTime)    // Fully overlaps
            );
    });
};

// CREATE A NEW Booking WITH Name, Date, Start Time, and End Time
bookRouter.post("/", (req, res) => {
    const { roomId, name, date, startTime, endTime } = req.body;

    // Validate input fields
    if (!roomId || !name || !date || !startTime || !endTime) {
        return res.status(400).json({ msg: "All fields (roomId, name, date, startTime, endTime) are required." });
    }

    // Check if the room is already booked for the selected date and time
    if (isRoomBooked(roomId, date, startTime, endTime)) {
        return res.status(400).json({ message: "Room is already booked for the selected date and time." });
    }

    // Create a new booking
    const newBook = {
        id: v4(), // Unique booking ID
        roomId,
        name,
        date,
        startTime,
        endTime,
    };

    // Add the new booking to the in-memory storage
    booking.push(newBook);

    // Respond with the new booking details
    res.status(201).json({ msg: "Room booked successfully", book: newBook });
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
