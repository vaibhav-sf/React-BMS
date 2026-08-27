import { render, screen } from '@testing-library/react'

const TestComponent = () => {
  return <h1>Book Management System</h1>
}

describe('React Testing', () => {
  test('renders BMS heading', () => {
    render(<TestComponent />)

    expect(
      screen.getByRole('heading', {
        name: 'Book Management System',
      })
    ).toBeInTheDocument()
  })
})