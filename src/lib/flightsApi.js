const baseUrl = "http://localhost:3000/api/flights/";

export const getDestinationsByPopularity = () => {
    return getData(`${baseUrl}populardestinations`);
}

export const getMorningFlightDetails = () => {
    return getData(`${baseUrl}morning`);
}

export const getUniqueFlightNumbers = () => {
    return getData(`${baseUrl}uniqueperday`);
}

export const getFlightsSortedByStops = () => {
    return getData(`${baseUrl}sortedbystops`);
}

const getData = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .catch(error => console.log(error));
}   