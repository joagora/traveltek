import { useEffect, useState } from "react";
import { getDestinationsByPopularity, getMorningFlightDetails, getUniqueFlightNumbers, getFlightsSortedByStops, getReturnFlightsWithoutStops } from "../lib/flightsApi";

import DestinationsTable from './DestinationsTable';
import FlightsTable from './FlightsTable';
import Details from './Details';
import UniqueFlightNumbersTable from './UniqueFlightNumbersTable';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function FlightsDashboard() {
    const [popularDestinations, setPopularDestinations] = useState();
    const [morningFlights, setMorningFlights] = useState();
    const [uniqueNumbers, setUniqueNumbers] = useState();
    const [flightsByStops, setFlightsByStops] = useState();
    const [returnWithoutStops, setReturnWithoutStops] = useState();
    const [tabKey, setTabKey] = useState();

    const handleTabSelection = (key) => {
        setTabKey(key);

        if (key === "morning") {
            getMorningFlights();
        } else if (key === "unique") {
            getUniqueFlights();
        } else if (key === "sortedByStops") {
            getFlightsByNumberOfStops();
        } else if (key === "returnWithoutStops") {
            getReturnFlightsWithNoStops();
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

    const getReturnFlightsWithNoStops = () => {
        if (!returnWithoutStops) {
            getReturnFlightsWithoutStops().then((flights) => {
                setReturnWithoutStops(flights);
            })
        }
    }
    useEffect(() => {
        getDestinationsByPopularity().then((destinations) => {
            const mostPopularDestinations = destinations;
            setPopularDestinations(mostPopularDestinations);
        });
    }, [])

    return (
        <Tabs onSelect={handleTabSelection} defaultActiveKey="destinations" id="uncontrolled-tab-example">
            <Tab 
                eventKey="destinations" 
                title="Popular destinations">
                <DestinationsTable 
                    popularDestinations={popularDestinations}>
                </DestinationsTable>
            </Tab>
            <Tab
                eventKey="morning"
                title="Morning flights">
                <Details 
                    header={"Number of morning flights"}
                    content={morningFlights?.length}></Details>
                <FlightsTable
                    tableData={morningFlights}>
                </FlightsTable>
            </Tab>
            <Tab 
                eventKey="unique"
                title="Unique flight numbers">
                <UniqueFlightNumbersTable
                    tableData={uniqueNumbers}>
                </UniqueFlightNumbersTable>
            </Tab>
            <Tab
                eventKey="sortedByStops"
                title="Flight with most stops">
                <FlightsTable
                    tableData={flightsByStops}
                    showStopsNumber={true}>
                </FlightsTable>
            </Tab>
            <Tab
                eventKey="returnWithoutStops"
                title="Return flights with no stops">
                <Details 
                    header={"Number of return flights with no stops"}
                    content={returnWithoutStops?.length}></Details>
                <FlightsTable
                    tableData={returnWithoutStops}>
                </FlightsTable>
            </Tab>
        </Tabs>
    )
  }
  
  export default FlightsDashboard;
  