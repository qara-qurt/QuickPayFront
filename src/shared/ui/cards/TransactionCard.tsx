import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'

export const TransactionCard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                padding: '20px',
                borderRadius: '24px',
            }}
        >
            <Box>
                <Typography
                    variant="inherit"
                    sx={{
                        color: COLORS.gray,
                        marginBottom: '3px',
                    }}
                >
                    Transaction ID
                </Typography>
                <Typography variant="inherit">123456789</Typography>
            </Box>
            <Box>
                <Typography
                    variant="inherit"
                    sx={{
                        color: COLORS.gray,
                        marginBottom: '3px',
                    }}
                >
                    Date
                </Typography>
                <Typography variant="inherit">12.05.23 13:44</Typography>
            </Box>
            <Box>
                <Typography
                    variant="inherit"
                    sx={{
                        color: COLORS.gray,
                        marginBottom: '3px',
                    }}
                >
                    Payment
                </Typography>
                <Typography variant="inherit">Kaspi QR</Typography>
            </Box>
            <Box>
                <Typography
                    variant="inherit"
                    sx={{
                        color: COLORS.gray,
                        marginBottom: '3px',
                    }}
                >
                    Products
                </Typography>
                <Typography variant="inherit">shirt, sneakers, hats</Typography>
            </Box>
            <Box>
                <Typography
                    variant="inherit"
                    sx={{
                        color: COLORS.gray,
                        marginBottom: '5px',
                    }}
                >
                    Total price
                </Typography>
                <Typography variant="inherit">25000kz</Typography>
            </Box>
        </Box>
    )
}
