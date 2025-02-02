const login = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByTestId('title').fill(blog.title)
    await page.getByTestId('author').fill(blog.author)
    await page.getByTestId('url').fill(blog.url)
    await page.getByRole('button', { name: 'Add blog' }).click()
    await page.locator('.success').waitFor()
    await page.getByRole('button', { name: 'cancel' }).click()
}

export { login, createBlog }