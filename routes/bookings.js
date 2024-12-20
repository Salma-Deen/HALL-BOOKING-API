import express from "express";
import { v4 } from "uuid";

const bookRouter = express.Router();

// In-memory storage for bookings
const bookings = [];

// CREATE A ROOM BOOKING
bookRouter.post("/", (req, res) => {
  const { name, date, startTime, endTime } = req.body;

  // Validate required fields
  if (!name || !date || !startTime || !endTime) {
    return res.status(400).json({
      msg: "All fields are required (name, date, startTime, endTime).",
    });
  }

  // Create and store the booking
  const newBooking = {
    id: v4(), // Generate a unique ID for the booking
    name,
    date,
    startTime,
    endTime,
    bookingDate: new Date().toISOString(), // Automatically add booking date
    status: "Confirmed", // Default booking status
  };

  bookings.push(newBooking);

  res.status(201).json({
    msg: "Room booked successfully",
    booking: newBooking,
  });
});

// GET ALL BOOKINGS
bookRouter.get("/", (req, res) => {
  if (bookings.length === 0) {
    return res.status(404).json({ msg: "No bookings found" });
  }
  res.status(200).json({
    msg: "Successfully fetched all bookings",
    bookings,
  });
});

// GET A BOOKING BY ID
bookRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  // Find booking by ID
  const booking = bookings.find((buk) => buk.id === id);

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ msg: "Booking not found" });
  }
});

export default bookRouter;
