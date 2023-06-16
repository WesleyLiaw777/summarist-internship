const BASE_API_URL = `https://us-central1-summaristt.cloudfunctions.net`

const requests = {
    fetchSelected: `${BASE_API_URL}/getBooks?status=selected`,
    fetchRecommended: `${BASE_API_URL}/getBooks?status=recommended`,
    fetchSuggested: `${BASE_API_URL}/getBooks?status=suggested`,
}
export default requests


// `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
// `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`

// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`
// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`
// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`