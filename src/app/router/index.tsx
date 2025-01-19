import { createBrowserRouter } from 'react-router-dom'
import { SignInPage } from '@/pages/sign-in'
import { Layout } from '@/shared/ui/layout/Layout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SignInPage />,
            },
        ],
    },
])
