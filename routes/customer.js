import express from "express";
import { v4 } from "uuid";

const customerRouter = express.Router();

// In-memory storage for customers, rooms, and bookings
const customers = [];
const rooms = [];
const bookings = [];

// Fetch all customers with their booked data
customerRouter.get("/all", (req, res) => {
  if (bookings.length === 0) {
    return res.status(404).json({ msg: "No bookings found" });
  }

  const customerDetails = bookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? room.name : "Room Not Found",
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });

  res.status(200).json({
    msg: "Successfully fetched all customer bookings",
    customerDetails,
  });
});

// List how many times a customer has booked the room
customerRouter.get("/bookings-summary", (req, res) => {
  if (bookings.length === 0) {
    return res.status(404).json({ msg: "No bookings found" });
  }

  const summary = customers.map((customer) => {
    const customerBookings = bookings.filter(
      (booking) => booking.customerId === customer.id
    );

    const bookingDetails = customerBookings.map((booking) => {
      const room = rooms.find((room) => room.id === booking.roomId);
      return {
        customerName: customer.name,
        roomName: room ? room.name : "Room Not Found",
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id,
        bookingDate: booking.bookingDate,
        bookingStatus: booking.status || "Confirmed",
      };
    });

    return {
      customerName: customer.name,
      totalBookings: customerBookings.length,
      bookingDetails,
    };
  });

  res.status(200).json({
    msg: "Successfully fetched customer booking summaries",
    summary,
  });
});

// Add a new customer
customerRouter.post("/add-customer", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Customer name is required" });
  }

  const newCustomer = { id: v4(), name };
  customers.push(newCustomer);

  res.status(201).json({
    msg: "Customer added successfully",
    customer: newCustomer,
  });
});

// Add a new room
customerRouter.post("/add-room", (req, res) => {
  const { name, amenities, price, seats } = req.body;

  if (!name || !amenities || !price || !seats) {
    return res.status(400).json({ msg: "All room details are required" });
  }

  const newRoom = { id: v4(), name, amenities, price, seats };
  rooms.push(newRoom);

  res.status(201).json({
    msg: "Room added successfully",
    room: newRoom,
  });
});

// Add a new booking
customerRouter.post("/add-booking", (req, res) => {
  const { customerId, roomId, date, startTime, endTime, status } = req.body;

  if (!customerId || !roomId || !date || !startTime || !endTime) {
    return res.status(400).json({ msg: "All booking details are required" });
  }

  const customer = customers.find((cust) => cust.id === customerId);
  const room = rooms.find((room) => room.id === roomId);

  if (!customer) {
    return res.status(404).json({ msg: "Customer not found" });
  }

  if (!room) {
    return res.status(404).json({ msg: "Room not found" });
  }

  const newBooking = {
    id: v4(),
    customerId,
    roomId,
    customerName: customer.name,
    date,
    startTime,
    endTime,
    bookingDate: new Date().toISOString(),
    status: status || "Confirmed",
  };

  bookings.push(newBooking);

  res.status(201).json({
    msg: "Booking added successfully",
    booking: newBooking,
  });
});

export default customerRouter;
