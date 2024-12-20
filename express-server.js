import express from "express";
import roomsRouter from "./routes/rooms.js";
import custRouter from "./routes/customer.js";
import bookRouter from "./routes/bookings.js";
const server = express();
server.use(express.json());

server.use("/rooms", roomsRouter);
server.use("/customer", custRouter);
server.use("/booking", bookRouter)
const PORT = 4500;

server.listen(PORT, () => {
    console.log("Server listening on ", PORT);
});
