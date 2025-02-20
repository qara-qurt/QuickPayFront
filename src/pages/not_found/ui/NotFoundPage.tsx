import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '@/shared/style/colors'

export const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: COLORS.lightBlue,
            }}
        >
            <Typography variant="h1" sx={{ color: COLORS.blue, fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ color: COLORS.gray, marginBottom: '20px' }}>
                Page Not Found
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: COLORS.blue,
                    color: COLORS.white,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: COLORS.darkBlue || '#326ACF',
                    },
                }}
                onClick={() => navigate(-1)}
            >
                Go Home
            </Button>
        </Box>
    )
}
