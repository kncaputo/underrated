const endpoint = `https://rancid-tomatillos.herokuapp.com/api/v2`;

export const fetchMovies = () => {
  return fetch(`${endpoint}/movies`)
  .then((response) => response.json())
}

export const fetchSingleMovie = (id) => {
  return fetch(`${endpoint}/movies/${+id}`)
  .then((response) => response.json())
}

export const fetchMovieTrailers = (id) => {
  return fetch(`${endpoint}/movies/${+id}/videos`)
  .then(response => response.json());
}

export const postLoginCredentials = (loginCredentials) => {
  return fetch(`${endpoint}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(loginCredentials)
  })
  .then((response) => response.json())
}

export const fetchUserRatings = (id) => {
  return fetch(`${endpoint}/users/${+id}/ratings`)
  .then((response) => response.json())
}

export const postUserRating = (id, rating) => {
  return fetch(`${endpoint}/users/${id}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(rating)
  })
  .then((response) => response.json())
}

export const deleteUserRating = (id, ratingId) => {
  return fetch(`${endpoint}/users/${+id}/ratings/${+ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
}