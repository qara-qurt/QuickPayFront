import { COLORS } from '@/shared/style/colors'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <Box
            sx={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',

                backgroundColor: COLORS.lightBlue,
            }}
        >
            <Box
                sx={{
                    margin: '0 auto',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}
