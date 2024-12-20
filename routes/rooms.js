import express from "express";
import { v4 } from "uuid";

const roomsRouter = express.Router();

// In-memory storage for rooms and room bookings
const rooms = [];
const roomBookings = []; // For tracking all bookings

// CREATE A ROOM with number of seats, amenities, and price
roomsRouter.post("/", (req, res) => {
  const { name, amenities, price, seats } = req.body;

  // Validate input
  if (!name || !amenities || !price || !seats) {
    return res.status(400).json({
      msg: "All fields are required (name, amenities, price, seats).",
    });
  }

  const newRoom = {
    id: v4(), // Generate a unique ID
    name,
    amenities,
    price,
    seats,
    roomBookings: [], // Initialize an empty array for bookings
  };

  rooms.push(newRoom);

  res.status(201).json({ msg: "Room created successfully", room: newRoom });
});

// GET ALL ROOMS
roomsRouter.get("/", (req, res) => {
  if (rooms.length === 0) {
    return res.status(404).json({ msg: "No rooms available" });
  }
  res.status(200).json(rooms);
});

// GET A ROOM BY ID
roomsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const room = rooms.find((room) => room.id === id);

  if (room) {
    res.status(200).json(room);
  } else {
    res.status(404).json({ msg: "Room not found" });
  }
});

// BOOK A ROOM (ADD ROOM BOOKING DETAILS)
roomsRouter.patch("/:id/book", (req, res) => {
  const { id } = req.params;
  const { customerName, date, startTime, endTime } = req.body;

  // Validate input
  if (!customerName || !date || !startTime || !endTime) {
    return res.status(400).json({
      msg: "All fields are required (customerName, date, startTime, endTime).",
    });
  }

  const room = rooms.find((room) => room.id === id);

  if (!room) {
    return res.status(404).json({ msg: "Room not found" });
  }

  // Check for booking conflicts
  const isConflict = room.roomBookings.some(
    (booking) =>
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime))
  );

  if (isConflict) {
    return res
      .status(400)
      .json({ msg: "Room is already booked for the selected date and time." });
  }

  // Create a new booking
  const newBooking = {
    id: v4(), // Generate a unique booking ID
    customerName,
    date,
    startTime,
    endTime,
  };

  // Add the booking to the room and the global booking list
  room.roomBookings.push(newBooking);
  roomBookings.push({
    ...newBooking,
    roomId: id,
    roomName: room.name,
  });

  res.status(201).json({ msg: "Room booked successfully", booking: newBooking });
});

// GET ALL BOOKINGS
roomsRouter.get("/bookings/all", (req, res) => {
  if (roomBookings.length === 0) {
    return res.status(404).json({ msg: "No bookings available" });
  }
  res.status(200).json(roomBookings);
});

export default roomsRouter;
