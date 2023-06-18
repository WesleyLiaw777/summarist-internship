const BASE_API_URL = `https://us-central1-summaristt.cloudfunctions.net`;
let requests: any[] = [
  `${BASE_API_URL}/getBooks?status=selected`,
  `${BASE_API_URL}/getBooks?status=recommended`,
  `${BASE_API_URL}/getBooks?status=suggested`,
];
export default requests;

export const FETCH_BY_AUTHOR_OR_TITLE_URL = `${BASE_API_URL}/getBooksByAuthorOrTitle?search=`;
export const FETCH_BY_ID_URL = `${BASE_API_URL}/getBook?id=`;

// `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
// `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`

// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`
// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`
// `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`
