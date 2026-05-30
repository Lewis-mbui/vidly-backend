// POST /api/returns {customerId, movieId}

// Return 401(unauthorized) if client is not logged in
// Return 400(Bad request) if customerId is not provided
// Return 400(Bad request) if movieId is not provided
// Return 404(not found) if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// set return date
// calculate the rental fee
// Increase the stock
// Return the rental