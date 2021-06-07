import './Details.scss';

function Details({ header, content }) {
    const getDetailElement = () => {
        return (
            <div class="row-container">
                <h5>{ header }:</h5>
                <span>{ content }</span>
            </div>)
    }
    return (
        <>
            { content && getDetailElement()}
        </>
    )
}
  
export default Details;
  