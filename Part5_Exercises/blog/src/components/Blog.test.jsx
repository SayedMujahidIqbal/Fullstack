import { render, screen } from "@testing-library/react";
import Blog from './Blog'
import userEvent from "@testing-library/user-event";

test('render blog title and author only', () => {
    const blog = {
        title: 'my blog',
        author: 'mujahid',
        url: 'https://mujiblogs.com/myblog.html',
        likes: '2'
    }


    /////// required in proptypes ////////////
    const updateLikes = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        return updatedBlog
    } 
    
    /////// required in proptypes ////////////
    const deleteBlog = () => {
        return blog
    }

    const { container } = render(<Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />)

    screen.debug()

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


    /////// required in proptypes ////////////
    const updateLikes = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        return updatedBlog
    } 
    
    /////// required in proptypes ////////////
    const deleteBlog = () => {
        return blog
    }

    const { container } = render(<Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />)
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('view')
    user.click(showDetailsButton)

    const detailsDiv = container.querySelector('.details')

    expect(detailsDiv).toHaveStyle('display: none')
    
})