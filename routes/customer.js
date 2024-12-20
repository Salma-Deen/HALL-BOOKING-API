import express from "express";
import { v4 } from "uuid";

// Dummy in-memory data for rooms and bookings (for demonstration purposes)
const rooms = [];
const booking = [];
const customer = [];

const custRouter = express.Router();

// Helper function to check if the room is booked at the given date and time
const isRoomBooked = (roomName, date, startTime, endTime) => {
    return booking.some(book => {
        return book.roomName === roomName &&
            book.date === date &&
            (
                (startTime >= book.startTime && startTime < book.endTime) ||  // Overlaps at start time
                (endTime > book.startTime && endTime <= book.endTime) ||    // Overlaps at end time
                (startTime <= book.startTime && endTime >= book.endTime)    // Fully overlaps
            );
    });
};

// CREATE A NEW CUSTOMER WITH Name, Room Name, Date, Start Time, and End Time
custRouter.post("/", (req, res) => {
    const { name, roomName, date, startTime, endTime } = req.body;

    // Validate the required fields
    if (!name || !roomName || !date || !startTime || !endTime) {
        return res.status(400).json({ msg: "All fields (name, roomName, date, startTime, endTime) are required." });
    }

    // Check if the room is already booked at the requested time
    if (isRoomBooked(roomName, date, startTime, endTime)) {
        return res.status(400).json({ msg: "Room is already booked for the selected date and time." });
    }

    const newCust = {
        id: v4(),
        name,
        roomName,
        date,
        startTime,
        endTime,
    };

    // Add the new customer to the customer list
    customer.push(newCust);

    // Also, you can create a booking for the room at the same time
    const newBooking = {
        roomName,
        date,
        startTime,
        endTime,
        customerId: newCust.id
    };

    // Add the booking to the in-memory booking list
    booking.push(newBooking);

    res.status(201).json({ msg: "A new customer is created successfully", customer: newCust });
});

// GET ALL CUSTOMERS
custRouter.get("/", (req, res) => {
    res.json(customer);
});

// GET A CUSTOMER BY ID
custRouter.get("/:id", (req, res) => {
    const custId = req.params.id;
    const cust = customer.find((cus) => cus.id === custId);

    if (cust) {
        res.json(cust);
    } else {
        res.status(404).json({ msg: "Customer not found" });
    }
});

export default custRouter;
