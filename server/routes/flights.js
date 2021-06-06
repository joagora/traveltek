const express = require('express');
const router = express.Router();

const flightsRouter = function (provider) {

  router.get('/', async (req, res) => {
    const allData = await provider.fetchAllFlightsData();
    res.send(allData);
  });

  router.get('/sortedbystops', async (req, res) => {
    const allData = await provider.getFlightsSortedByNumberOfStops();
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


  return router
}
module.exports = flightsRouter;