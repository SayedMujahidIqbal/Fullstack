import { render, screen } from "@testing-library/react";
import Blog from './Blog'

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
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(title).not.toHaveStyle('display: none')
    expect(author).not.toHaveStyle('display: none')
    expect(url).toHaveStyle('display: none')
    expect(likes).toHaveStyle('display: none')
})