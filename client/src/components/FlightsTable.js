import Table from 'react-bootstrap/Table'

function FlightsTable({ tableData, showStopsNumber }) {
 
    const getRows = () => {
        return tableData.map((flight, i) => {
            return (
                <tr key={`${flight.outflightno}-${i}`}>
                    <th >{flight.outflightno}</th>
                    <th>{flight.depair}</th>
                    <th>{flight.destair}</th>
                    <th>{flight.carrier}</th>
                    <th>{flight.incarriercode}</th>
                    <th>{flight.indepartdate}</th>
                    <th>{flight.indeparttime}</th>
                    <th>{flight.outarrivaldate}</th>
                    <th>{flight.outarrivaltime}</th>
                    <th>{flight.oneway === 0 ? "Return": "One way"}</th>
                    <th>{flight.originalprice} {flight.originalcurrency}</th>
                    { showStopsNumber && <th>{flight.segments.length}</th> }
                </tr>
            )
        });
    }
    return (
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Flight number</th>
                <th>Departure airport</th>
                <th>Arrival airport</th>
                <th>Carrier</th>
                <th>Carrier code</th>
                <th>Departure date</th>
                <th>Departure time</th>
                <th>Arrival date</th>
                <th>Arrival time</th>
                <th>Type</th>
                <th>Original price</th>
                { showStopsNumber && <th>Number of stops</th> }
            </tr>
        </thead>
        <tbody>
           { getRows() }
        </tbody>
    </Table>
    
    )
  }
  
export default FlightsTable;

