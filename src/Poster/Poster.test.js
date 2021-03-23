import { render } from 'react-dom'
import Poster from './Poster'
import { mockMovies } from '../testData'
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
              id={mockMovies[0].id}
              title={mockMovies[0].title}
              rating={mockMovies[0].average_rating}
              image={mockMovies[0].poster_path}
              key={mockMovies[0].id}
            />  
          </BrowserRouter>, container
        ) 
      })

    expect(container.textContent).toBe('Money Plane☆ 6.1/10☆ 6.1/10')
  })
})