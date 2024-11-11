const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./handler')

describe('Blog app', () => {
    beforeEach(async({ page, request }) => {
        await request.post('./api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'tester',
                username: 'blogtester',
                password: 'root'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    test('user can login', async ({ page }) => {
        await login(page, 'blogtester', 'root')
        await expect(page.getByText('tester logged-in')).toBeVisible()
    })

    test('login fails with wrong credentials', async ({ page }) => {
        await login(page, 'blogtester', 'wrong')
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'blogtester', 'root')
        })

        test('a new blog can be added', async ({ page }) => {
            const newBlog = {
                title: 'test blog',
                author: 'tester',
                url: 'https://blogsbytester.com/testblog.html'
            }
            await createBlog(page, newBlog)
            const titleDiv = await page.locator('.title')
            await expect(titleDiv).toContainText(newBlog.title)
        })
    })
})