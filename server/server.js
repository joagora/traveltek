const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'dist');
const flightsRouter = require('./routes/flights.js');
const FlightProvider = require('./providers/flightProvider.js');
app.use(express.static(publicPath));
const flightsProvider = new FlightProvider();
app.use('/api/flights', flightsRouter(flightsProvider));

app.listen(3000, function() {
  console.log(`server running on port ${ this.address().port }`);
});
