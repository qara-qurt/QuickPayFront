import { createBrowserRouter } from 'react-router-dom'
import { SignInPage } from '@/pages/sign-in'
import { SignUpPage } from '@/pages/sign-up'
import { MainPage } from '@/pages/main'
import { Layout } from '@/shared/ui'

export const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
        ],
    },
    {
        path: '/sign-in',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SignInPage />,
            },
        ],
    },
    {
        path: '/sign-up',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SignUpPage />,
            },
        ],
    },
])
