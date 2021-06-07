const csv = require('csvtojson');
const getMappedFlightsData = require('../helpers/mappingHelper');
const moment = require('moment')
const FlightProvider = function () {
};

FlightProvider.prototype.fetchAllFlightsData = async function() {
  const flights = await csv()
    .fromFile('server/data/flighdata/flighdata.csv');
  const flightsSegments = await csv()
    .fromFile('server/data/flighdata/flighdata_segments.csv');
  return getMappedFlightsData(flights, flightsSegments);
}

FlightProvider.prototype.getFlightWithMostStops = async function() {
  const allFlights = await this.fetchAllFlightsData()
  return allFlights.sort((a, b) => {
    return b.segments.length - a.segments.length;
  }).slice(0, 1);
}

FlightProvider.prototype.getMorningFlights = async function() {
  const allFlights = await this.fetchAllFlightsData()
  console.log(allFlights[0])
  return allFlights.filter(flight => {

    const hour = moment(new Date(`${flight.outdepartdate}T${flight.outdeparttime}`)).format('h:mma');
    return hour.includes("am");
  });
}

FlightProvider.prototype.getUniqueFlightNumbers = async function() {
  const allFlights = await this.fetchAllFlightsData();
  const uniqueDates = [...new Set(allFlights.map(item => item.outdepartdate))]

  const flightsPerDate = [];
  uniqueDates.forEach((date) => {
    const flightsPerDay = allFlights.filter(flight => {
      return flight.outdepartdate === date && flight.inflightno;
    }).map(flight => {
      return flight.inflightno
    });
    flightsPerDate.push({
      date,
      flightsPerDay
    })
  })
  return flightsPerDate;
}

FlightProvider.prototype.getMostPopularDestinations = async function() {
  const allFlights = await this.fetchAllFlightsData()
  const destinationPopularity = [];
  allFlights.forEach(flight => {
    const existingDestination = destinationPopularity.find(item => {
      return item.destinationCode === flight.destair;
    });

    if (existingDestination) {
      existingDestination.count += 1 ;
    } else {
      destinationPopularity.push({
        destinationCode: flight.destair,
        count: 1
      })
    }
  });
  return destinationPopularity.sort((a, b) => {
    return b.count - a.count;
  }).slice(0, 10);
}

FlightProvider.prototype.getReturnFlightsWithNoStops = async function() {
  const allFlights = await this.fetchAllFlightsData();
  return allFlights.filter(flight => {
    return flight.oneway === "0" && flight.segments.length === 0;
  });
}

module.exports = FlightProvider;
