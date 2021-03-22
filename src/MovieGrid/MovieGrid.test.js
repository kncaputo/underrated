import MovieGrid from './MovieGrid'
import { mockMovies } from '../testData'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('MovieGrid', () => {
  render(
    <BrowserRouter>
      <MovieGrid
        movies={mockMovies}
      />
    </BrowserRouter>
  )

  it('should render correctly', () => {
    const movieTitle1 = screen.getByText('Money Plane')
    const movieTitle2 = screen.getByText('Mulan')
    const movieTitle3 = screen.getByText('Rogue')
    
    expect(movieTitle1).toBeInTheDocument()  
    expect(movieTitle2).toBeInTheDocument()  
    expect(movieTitle3).toBeInTheDocument()  
  })
})