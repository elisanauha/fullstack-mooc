import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  const component = render(
    <Blog
      blog={blog}
      like={() => console.log('liked')}
      remove={() => console.log('removed')}
      usersPost={false}
    />
  )

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
})
