import { Routes, Route, Navigate } from 'react-router-dom'
import { SignInPage } from '@/pages/sign-in'
import { SignUpPage } from '@/pages/sign-up'
import { MainPage } from '@/pages/main'
import { Layout } from '@/shared/ui'
import { CashBoxPage } from '@/pages/cashbox'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminPage } from '@/pages/admin'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { NotFoundPage } from '@/pages/not_found'

export const mainRoutes = ['/all', '/cash-boxes', '/products', '/employees', '/analytics']
export const mainRoutesAdmin = [
    '/admin-companies',
    '/admin-cash-boxes',
    '/admin-products',
    '/admin-employees',
    '/admin-analytics',
]

export const Router = () => {
    const user = useSelector((state: RootState) => state.auth?.user)

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/all" replace />} />

            {/* ADMIN ROUTES */}
            {user?.roles.includes('ADMIN') &&
                mainRoutesAdmin.map(path => (
                    <Route key={path} path={path} element={<Layout />}>
                        <Route index element={<AdminPage />} />
                    </Route>
                ))}

            {/* MAIN ROUTES */}
            {user?.roles.includes('ADMIN') === false &&
                mainRoutes.map(path => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<MainPage />} />
                    </Route>
                ))}

            <Route
                path="/cash-boxes/:id/view"
                element={
                    <ProtectedRoute>
                        <CashBoxPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
