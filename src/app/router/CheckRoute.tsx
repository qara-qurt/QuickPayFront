import { useAuth } from '@/shared/hooks/useAuth'
import { Box, CircularProgress } from '@mui/material'

interface CheckRouteProps {
    children: JSX.Element
}

export const CheckRoute: React.FC<CheckRouteProps> = ({ children }) => {
    const { isLoading } = useAuth()

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return children
}
