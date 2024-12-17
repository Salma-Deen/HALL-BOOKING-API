RENDER.COM:

RENDER deployment Link:
https://hall-booking-api-cay4.onrender.com

****ROOMS****
1)Creating a room:POST-https://hall-booking-api-cay4.onrender.com/rooms
2)Getting ALL room DETAILS:GET-https://hall-booking-api-cay4.onrender.com/rooms
3)Getting Details of a Single room using ID:GET-https://hall-booking-api-cay4.onrender.com/rooms/U-ID(4d87c65f-6a52-4158-b300-aee8389dc517)


****CUSTOMERS****
1)Creating a Customer:POST-https://hall-booking-api-cay4.onrender.com/customer
2)Getting ALL customer DETAILS:GET-https://hall-booking-api-cay4.onrender.com/customer
3)Getting Details of a Single customer using ID:GET-https://hall-booking-api-cay4.onrender.com/customer/U-ID(41494859-ea0b-4964-81ed-f52e2ca82bfe)


****BOOKING****
1)Create a Booking:POST-https://hall-booking-api-cay4.onrender.com/booking
2)Getting ALL booking DETAILS:GET-https://hall-booking-api-cay4.onrender.com/booking
3)Getting Details of a Single booking using ID:GET-https://hall-booking-api-cay4.onrender.com/booking/U-ID(60f1a00b-3512-42c2-a452-d33f6c63978c)
