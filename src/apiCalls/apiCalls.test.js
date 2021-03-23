import { fetchMovies, fetchSingleMovie, fetchMovieTrailers, postLoginCredentials, fetchUserRatings, postUserRating, deleteUserRating } from './apiCalls';
import { user, loginCredentials, singleMovie, trailers, movies } from '../testData';
import '@testing-library/jest-dom';

describe('fetch', () => {
  let type;

  beforeEach(() => {
    type = {"Content-Type": "application/json"};

    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve({ mockReturn: { mockValue: "The Payload" } }),
      })
    )
  })
  afterEach(() => jest.restoreAllMocks());

  it('should be called with the correct argument when fetchMovies is called', () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies';

    fetchMovies();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('should be called with the correct argument when fetchSingleMovie is called with an id', () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/1';

    fetchSingleMovie(1)

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('should be called with the correct argument when fetchMovieTrailers is called with an id', () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/1/videos'

    fetchMovieTrailers(1)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('should be called with the correct argument and body when postLoginCredentials is called with login credentials', () => {
    const bodyHeadersMethod = {
      body: JSON.stringify(loginCredentials),
      headers: type, method: 'POST'
    }
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/login';

    postLoginCredentials(loginCredentials);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, bodyHeadersMethod);
  })

  it('should be called with the correct argument when fetchUserRatings is called with an id', () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/users/1/ratings'

    fetchUserRatings(1)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenLastCalledWith(url)
  })

  it('should be called with the correct arguments when postUserRating is called with an id and a rating', () => {
    const rating = 5.5
    const bodyHeadersMethod = {
      body: JSON.stringify(rating),
      headers: type, method: 'POST'
    }
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/users/1/ratings'

    postUserRating(1, rating)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenLastCalledWith(url, bodyHeadersMethod)
  })

  it('should be called with the correct arguments when deleteUserRating is called with an id and ratingId', () => {
    const bodyHeadersMethod = {
      headers: type, method: 'DELETE'
    }
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/users/1/ratings/1'

    deleteUserRating(1, 1)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenLastCalledWith(url, bodyHeadersMethod)
  })
})