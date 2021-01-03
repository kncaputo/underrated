import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// mock fetchMovies, fetchSingleMovie, postLoginCredentials (async)
// test that app is rendered
// test that filter works (all 3)

// integration tests:
  // movies are filtered (and cleared)
  // movie details shows on button click (router)
  // you can submit log in credentials and are logged in/shown error
  // nav bar --> load page, click poster, view details, click all movies, get back to main
  // log in, do stuff, log out (could be several tests)
