import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const addBlog = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm addBlog={addBlog} />)
  })

  test('renders form', () => {
    expect(component.container).toHaveTextContent(`create new`)
    expect(component.container).toHaveTextContent('create')
  })

  test('calls save function with correct data', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing of forms' },
    })
    fireEvent.change(author, {
      target: { value: 'Terry Tester' },
    })
    fireEvent.change(url, {
      target: { value: 'www.example.com' },
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0].title).toBe('testing of forms')
    expect(addBlog.mock.calls[0][0].author).toBe('Terry Tester')
    expect(addBlog.mock.calls[0][0].url).toBe('www.example.com')
  })
})
