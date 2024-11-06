import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from './Blog'

test('render blog title and author only', () => {
    const blog = {
        title: 'my blog',
        author: 'mujahid',
        url: 'https://mujiblogs.com/myblog.html',
        likes: '2'
    }
    const mockHandler = vi.fn()
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} deleteBlog={mockHandler} />)
    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const detailsDiv = container.querySelector('.details')

    expect(title).not.toHaveStyle('display: none')
    expect(author).not.toHaveStyle('display: none')
    expect(detailsDiv).toHaveStyle('display: none')
})

test('show url and number of likes on view button click', () => {
    const blog = {
        title: 'my blog',
        author: 'mujahid',
        url: 'https://mujiblogs.com/myblog.html',
        likes: '2'
    }
    const mockHandler = vi.fn()
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} deleteBlog={mockHandler} />)
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('view')
    user.click(showDetailsButton)
    const detailsDiv = container.querySelector('.details')
    expect(detailsDiv).toHaveStyle('display: none')  
})

test('test like button clicked twice received event handler prop twice', async () => {
    const blog = {
        title: 'my blog',
        author: 'mujahid',
        url: 'https://mujiblogs.com/myblog.html',
        likes: '2'
    }
    const mockHandler = vi.fn()
    render(<Blog blog={blog} updateLikes={mockHandler} deleteBlog={mockHandler} />)
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})