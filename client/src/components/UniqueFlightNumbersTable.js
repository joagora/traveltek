import Table from 'react-bootstrap/Table';
import moment from 'moment';

function UniqueFlightNumbers({tableData}) {
    const getRows = () => {
        return tableData?.map((dataElement, i) => {
            return (
                <tr key={`${i}`}>
                    <th >{ moment(dataElement.date).format("MM-DD-YYYY") }</th>
                    <th>{ dataElement.flightsPerDay.length }</th>
                </tr>
            )
        });
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Number of unique flight numbers</th>
                </tr>
            </thead>
            <tbody>
                { getRows() }
            </tbody>
        </Table>
    )
  }
  
export default UniqueFlightNumbers;
