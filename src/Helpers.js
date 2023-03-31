// Takes in a HTTP |response| and throws an error if it's not 200 else returns |response| as is.
export function handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}