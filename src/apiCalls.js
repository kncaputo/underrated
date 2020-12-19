export const fetchMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  .then((response) => {
    if(!response.ok) {
      throw Error('Sorry! We\'ve encountered an error')
    }
    return response.json()
  })
}

export const fetchSingleMovie = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${+id}`)
  .then((response) => {
    if(!response.ok) {
      throw Error('Sorry! We\'ve encountered an error')
    }
    return response.json()
  })
}

export const fetchMovieTrailers = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${+id}/videos`)
  .then(response => response.json());
}

// export {
//   fetchMovies,
//   fetchSingleMovie,
//   fetchTrailers
// };