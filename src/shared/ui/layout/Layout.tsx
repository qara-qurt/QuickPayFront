import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <Box
            sx={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
            }}
        >
            <Outlet />
        </Box>
    )
}
