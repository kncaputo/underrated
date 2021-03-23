import { render } from 'react-dom'
import Poster from './Poster'
import { movies } from '../testData'
import { BrowserRouter } from 'react-router-dom'
import { act } from "react-dom/test-utils";

describe('Poster', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  })
  
  it('should render a poster', () => {
      act(() => {
        render(
          <BrowserRouter>
            <Poster
              id={movies[0].id}
              title={movies[0].title}
              rating={movies[0].average_rating}
              image={movies[0].poster_path}
              key={movies[0].id}
            />  
          </BrowserRouter>, container
        ) 
      })

    expect(container.textContent).toBe('Money Plane☆ 6.1/10☆ 6.1/10')
  })
})