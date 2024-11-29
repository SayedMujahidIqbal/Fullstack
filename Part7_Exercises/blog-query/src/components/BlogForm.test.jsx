import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test('blog submission with right details successfully', async () => {
    const creatBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={creatBlog} />)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')

    
    await user.type(title, 'Testing blogform')
    await user.type(author, 'Mujahid')
    await user.type(url, 'https://testingblogs.com/testingblogform.html')
    const saveBlogButton = screen.getByText('Add Blog')
    await user.click(saveBlogButton)

    expect(creatBlog.mock.calls).toHaveLength(1)
    expect(creatBlog.mock.calls[0][0].title).toBe('Testing blogform')
    expect(creatBlog.mock.calls[0][0].author).toBe('Mujahid')
    expect(creatBlog.mock.calls[0][0].url).toBe('https://testingblogs.com/testingblogform.html')
})