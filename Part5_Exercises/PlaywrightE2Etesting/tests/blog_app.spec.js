const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./handler')
const path = require('path')


describe('Blog app', () => {
    beforeEach(async({ page, request }) => {
        await request.post('/api/testing/reset')
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
                url: 'https://blogsbytester.com/testblog.html',
            }
            await createBlog(page, newBlog)
            await expect(page.locator('.title')).toContainText('test blog')
        })

        describe('a blog exists ', () => {
            beforeEach(async ({ page }) => {
                const blog = {
                    title: 'my blog',
                    author: 'blogstester',
                    url: 'https://blogsbytester.com/myblog.html',
                } 
                await createBlog(page, blog)
            })

            test('a note can be liked', async ({ page }) => {
                const blogTitle = await page.getByText('my blog')
                const blogElement = await blogTitle.locator('..')
                await blogElement.getByRole('button', { name: 'view' }).click()
                const blogText = await blogElement.locator('.likes').innerText()
                await blogElement.getByRole('button', { name: 'like' }).click()
                await expect(blogElement.getByText(`Likes ${Number(blogText[6]) + 1 }`)).toBeVisible()
            })
        })

        describe('when deleting a blog', async () => {
            beforeEach(async({ page }) => {
                const myBlog = {
                    title: 'my blog 2',
                    author: 'blogstester',
                    url: 'https://blogsbytester.com/myblogtwo.html',
                } 
                await createBlog(page, myBlog)
            })

            test('remove button can only be displayed for creator', async ({ page }) => {
                const blogTitle = await page.getByText('my blog 2')
                const blogElement = await blogTitle.locator('..')
                await blogElement.getByRole('button', { name: 'view' }).click()
                await expect(page.locator('.details')).toBeVisible()
                const blogDetails = await page.locator('.details')
                await expect(blogDetails.getByRole('button', { name: 'remove' })).toBeVisible()
            }) 
    
            test('a blog can only be deleted by blog creator', async ({ page }) => {
                const blogTitle = await page.getByText('my blog 2')
                const blogElement = await blogTitle.locator('..')
                await blogElement.getByRole('button', { name: 'view' }).click()
                await expect(page.locator('.details')).toBeVisible()
                const blogDetails = await page.locator('.details')
                await blogDetails.getByRole('button', { name: 'remove' }).click()
                await page.on('dialog', async dialog  => {
                    console.log(`Remove blog my blog 2 by blogstester ${dialog.message()}`);
                    await dialog.accept()
                })
                await expect(page.getByText('my blog 2')).not.toBeVisible()
            })
        })

        describe('sort blogs according to likes', () => {
          beforeEach(async({page}) => {
            await createBlog(page, {
                title: 'my blog 3',
                author: 'blogstester',
                url: 'https://blogsbytester.com/myblogthree.html',
            })
            await createBlog(page, {
                title: 'my blog 4',
                author: 'blogstester',
                url: 'https://blogsbytester.com/myblog4.html',
            })
          })

          test('blog sorted according to likes', async({ page }) => {
            const firstBlog = await page.getByText('my blog 3').locator('..')
            await firstBlog.getByRole('button', { name: 'view' }).click()
            await firstBlog.getByRole('button', { name: 'like' }).click()
            const blogText = await firstBlog.locator('.likes').innerText()
            await expect(firstBlog.getByText(`Likes ${Number(blogText[6]) + 1 }`)).toBeVisible()
            const firstBlogAfterSort = await page.locator('.blogs').first().innerText()
            await expect(page.locator('.title').first()).toContainText(firstBlogAfterSort.split('h')[0])
          })
        })
    })
})