import express from "express";
import { v4 } from "uuid";

const roomsRouter = express.Router();
const rooms = [];

// CREATE A ROOM with No. of seats available, amenities, and price 
roomsRouter.post("/", (req, res) => {
    const { seats, amenities, price } = req.body;

    // Validate that all required fields are present
    if (!seats || !amenities || !price) {
        return res.status(400).json({ msg: "All fields (seats, amenities, price) are required." });
    }

    // Validate that the price is a valid positive number
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ msg: "Price must be a positive number." });
    }

    const newRoom = {
        id: v4(),
        seats,
        amenities,
        price,
    };

    rooms.push(newRoom);
    res.status(201).json({ msg: "A room is created successfully", room: newRoom });
});

// GET ALL ROOMS
roomsRouter.get("/", (req, res) => {
    res.json(rooms);
});

// GET A ROOM BY ID
roomsRouter.get("/:id", (req, res) => {
    const roomId = req.params.id;
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ msg: "Room not found" });
    }
});

export default roomsRouter;
