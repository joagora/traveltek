import { useEffect, useState } from "react";
import { getDestinationsByPopularity, getMorningFlightDetails, getUniqueFlightNumbers, getFlightsSortedByStops } from "../lib/flightsApi";

import DestinationsTable from './DestinationsTable';
import FlightsTable from './FlightsTable';
import UniqueFlightNumbersTable from './UniqueFlightNumbersTable';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function FlightsDashboard() {
    const [popularDestinations, setPopularDestinations] = useState();
    const [morningFlights, setMorningFlights] = useState();
    const [uniqueNumbers, setUniqueNumbers] = useState();
    const [flightsByStops, setFlightsByStops] = useState();
    const [tabKey, setTabKey] = useState();

    const handleTabSelection = (key) => {
        setTabKey(key);

        if (key === "morning") {
            getMorningFlights();
        } else if (key === "unique") {
            getUniqueFlights();
        } else if (key === "sortedByStops") {
            getFlightsByNumberOfStops();
        }
    }

    const getMorningFlights = () => {
        if (!morningFlights) {
            getMorningFlightDetails().then((flights) => {
                setMorningFlights(flights);
            });
        }
    }

    const getUniqueFlights = () => {
        if (!uniqueNumbers) {
            getUniqueFlightNumbers().then((numbers) => {
                setUniqueNumbers(numbers);
            });
        }
    }

    const getFlightsByNumberOfStops = () => {
        if (!flightsByStops) {
            getFlightsSortedByStops().then((flights) => {
                setFlightsByStops(flights);
            })
        }
    }
    useEffect(() => {
        getDestinationsByPopularity().then((destinations) => {
            const mostPopularDestinations = destinations.slice(0, 10);
            setPopularDestinations(mostPopularDestinations);
        });
    }, [])

    return (
        <Tabs onSelect={handleTabSelection} defaultActiveKey="destinations" id="uncontrolled-tab-example">
            <Tab eventKey="destinations" title="Popular destinations">
                { popularDestinations && <DestinationsTable popularDestinations={popularDestinations}></DestinationsTable> }
            </Tab>
            <Tab eventKey="morning" title="Morning flights">
                { morningFlights && <FlightsTable tableData={morningFlights}></FlightsTable> }
            </Tab>
            <Tab eventKey="unique" title="Unique flight numbers">
                { uniqueNumbers && <UniqueFlightNumbersTable tableData={uniqueNumbers}></UniqueFlightNumbersTable> }
            </Tab>
            <Tab eventKey="sortedByStops" title="Flights by numbers of stops">
                { flightsByStops && <FlightsTable tableData={flightsByStops} showStopsNumber={true}></FlightsTable> }
            </Tab>
        </Tabs>
    )
  }
  
  export default FlightsDashboard;
  