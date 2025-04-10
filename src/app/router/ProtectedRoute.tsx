import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { mainRoutes } from './Router'

interface ProtectedRouteProps {
    children: JSX.Element
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth?.user)

    if (user?.roles.includes('ADMIN') && mainRoutes.includes(window.location.pathname)) {
        navigate('/admin-companies')
    }

    return children
}
