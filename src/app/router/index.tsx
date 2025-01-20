import { createBrowserRouter } from 'react-router-dom'
import { SignInPage } from '@/pages/sign-in'
import { Layout } from '@/shared/ui/layout/Layout'
import { SignUpPage } from '@/pages/sign-up'

export const router = createBrowserRouter([
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
