import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'New try at post populate',
    author: 'Me myself and I',
    url: 'locahost:3001',
    likes: 1,
    user: {
      username: 'tester',
      name: 'Terry Tester',
      id: '5f1171815ee15d18a8a7077f',
    },
    id: '5f158b61fd49f6700654176d',
  }

  const like = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        like={like}
        remove={() => console.log('removed')}
        usersPost={false}
      />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(component.container).not.toHaveTextContent(`${blog.url}`)
    expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('renders extra content when wanted', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(component.container).toHaveTextContent(`${blog.url}`)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('pressing like twice calls it twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})
