# Digital Cow Hut

Live Link: [https://example.com](https://example.com)

## Application Routes

### User

- `POST` /api/v1/auth/signup
- `GET` /api/v1/users
- `GET` /api/v1/users/64b144733435d7a2b036ed61 (Single GET)
- `PATCH` /api/v1/users/64b144733435d7a2b036ed61
- `DELETE` /api/v1/users/64b144733435d7a2b036ed61

### Cows

- `POST` /api/v1/cows
- `GET` /api/v1/cows
- `GET` /api/v1/cows/64b1791388160dca012055ed (Single GET)
- `PATCH` /api/v1/cows/64b1791388160dca012055ed
- `DELETE` /api/v1/cows/64b1791388160dca012055ed

### Pagination and Filtering routes of Cows

- `GET` /api/v1/cows?pag=1&limit=10
- `GET` /api/v1/cows?sortBy=price&sortOrder=asc
- `GET` /api/v1/cows?minPrice=1000&maxPrice=5000
- `GET` /api/v1/cows?location=Chattogram
- `GET` /api/v1/cows?query=Cha

### Orders

- `POST` /api/v1/orders
- `GET` /api/v1/orders
