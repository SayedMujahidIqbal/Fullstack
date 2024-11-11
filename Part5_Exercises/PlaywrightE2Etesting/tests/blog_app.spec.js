const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login } = require('./handler')

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
})