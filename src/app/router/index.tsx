import { createBrowserRouter } from 'react-router-dom'
import { SignInPage } from '@/pages/sign-in'
import { SignUpPage } from '@/pages/sign-up'
import { MainPage } from '@/pages/main'
import { Layout } from '@/shared/ui'

const mainRoutes = ['/all', '/cash-boxes', '/products', '/employees', '/analytics']

export const router = createBrowserRouter([
    ...mainRoutes.map(path => ({
        path,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
        ],
    })),
    {
        path: '/sign-in',
        children: [
            {
                index: true,
                element: <SignInPage />,
            },
        ],
    },
    {
        path: '/sign-up',
        children: [
            {
                index: true,
                element: <SignUpPage />,
            },
        ],
    },
])
