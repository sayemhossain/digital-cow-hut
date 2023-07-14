#Digital Cow Hut

Live Link: https://example.com

#Application Routes:

User
api/v1/auth/signup (POST)
api/v1/users (GET)
api/v1/users/64b144733435d7a2b036ed61 (Single GET)
api/v1/users/64b144733435d7a2b036ed61 (PATCH)
api/v1/users/64b144733435d7a2b036ed61 (DELETE)

Cows
api/v1/cows (POST)
api/v1/cows (GET)
api/v1/cows/64b1791388160dca012055ed (Single GET)
api/v1/cows/64b1791388160dca012055ed (PATCH)
api/v1/cows/64b1791388160dca012055ed (DELETE)

Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?query=Cha

Orders
api/v1/orders (POST)
api/v1/orders (GET)
