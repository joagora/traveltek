const getMappedFlightsData = (flights, flightsSegments) => {
    return flights.map(flight => {
        const flightSegments = flightsSegments.filter(segment => {
            return segment.flightid === flight.id;
        });
        return {
            ...flight,
            segments: flightSegments
        }
    })
}

module.exports = getMappedFlightsData;