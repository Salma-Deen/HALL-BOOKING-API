RENDER.COM:

RENDER deployment Link:
https://hall-booking-api-2-ynzw.onrender.com

****ROOMS****
1)Creating a room:POST-https://hall-booking-api-2-ynzw.onrender.com/rooms
2)Getting ALL room with BOOKED DATA:GET-https://hall-booking-api-2-ynzw.onrender.com/rooms
3)Getting Details of a Single room using ID:GET-https://hall-booking-api-2-ynzw.onrender.com/rooms/2b88ca2f-e6b7-4a6d-9d18-2ed93e831bd4
4)adding booked room details:PATCH-https://hall-booking-api-2-ynzw.onrender.com/rooms/de1771c8-e255-45ec-9788-e92622d25a62/book
5)GET ALL BOOKINGS:GET-https://hall-booking-api-2-ynzw.onrender.com/rooms/bookings/all

****BOOKING****
1)Create a Booking:POST-https://hall-booking-api-2-ynzw.onrender.com/booking
2)Getting ALL booking DETAILS:GET-https://hall-booking-api-2-ynzw.onrender.com/booking
3)Getting Details of a Single booking using ID:GET-https://hall-booking-api-2-ynzw.onrender.com/booking/c99948ad-4c6d-41e8-8ab5-5631fa651d6f

****CUSTOMERS****
1)Adding a Customer:POST-https://hall-booking-api-2-ynzw.onrender.com/customer/add-customer
2)Adding a Booking:POST-https://hall-booking-api-2-ynzw.onrender.com/customer/add-booking
3)Adding a Room:POST-https://hall-booking-api-2-ynzw.onrender.com/customer/add-room
4)Getting ALL BOOKINGS:GET-https://hall-booking-api-2-ynzw.onrender.com/customer/all
5)Getting BOOKING SUMMARY:GET-https://hall-booking-api-2-ynzw.onrender.com/customer/bookings-summary
