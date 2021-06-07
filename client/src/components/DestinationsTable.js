import Table from 'react-bootstrap/Table';

function DestinationsTable({popularDestinations}) {
  const getDestinationElements = () => {
    return popularDestinations?.map((destination, i) => {
        return (
          <tr key={`${destination}-${i}`}>
            <td>{ destination.destinationCode }</td>
            <td>{ destination.count }</td>
          </tr>
        )
    })
  }

  return (
    <Table>
        <thead>
            <tr>
            <th>Destination Code</th>
            <th>Number of destinations</th>
            </tr>
        </thead>
        <tbody>
          { getDestinationElements() }
        </tbody>
    </Table>
  )
}
  
export default DestinationsTable;

