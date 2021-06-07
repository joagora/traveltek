const express = require('express');
const router = express.Router();

const flightsRouter = function (provider) {

  router.get('/', async (req, res) => {
    const allData = await provider.fetchAllFlightsData();
    res.send(allData);
  });

  router.get('/moststops', async (req, res) => {
    const allData = await provider.getFlightWithMostStops();
    res.send(allData);
  });

  router.get('/morning', async (req, res) => {
    const allData = await provider.getMorningFlights();
    res.send(allData);
  });
  
  router.get('/uniqueperday', async (req, res) => {
    const allData = await provider.getUniqueFlightNumbers();
    res.send(allData);
  });

  router.get('/populardestinations', async (req, res) => {
    const allData = await provider.getMostPopularDestinations();
    res.send(allData);
  });

  router.get('/returnwithnostops', async (req, res) => {
    const allData = await provider.getReturnFlightsWithNoStops();
    res.send(allData);
  });

  return router
}
module.exports = flightsRouter;