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
            await expect(page.locator('.title')).toBeVisible
        })

        describe('a blog exists ', () => {
          beforeEach(async ({ page }) => {
            const blog = {
                title: 'my blog',
                author: 'blogstester',
                url: 'https://blogsbytester.com/myblog.html'
            } 
            createBlog(page, blog)
          })
          test('a note can be liked', async ({ page }) => {
            const blogToBeLikedTitle = await page.locator('.title')
            await expect(blogToBeLikedTitle).toContainText('my blog')
            await page.getByRole('button', { name: 'view' }).click()
            const blogText = await page.locator('.likes').innerText()
            const likes = Number(blogText[6])
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText(`Likes ${likes + 1 }`)).toBeVisible()
          })
        })
        
    })
})