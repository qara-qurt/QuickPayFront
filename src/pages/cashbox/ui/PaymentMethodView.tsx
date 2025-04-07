import { Box, Button, Typography } from '@mui/material'
import { COLORS } from '@/shared/style/colors'

interface PaymentMethodViewProps {
    total: number
    onBack: () => void
    onSelect: (method: string) => void
}

const paymentMethods = ['Kaspi QR', 'Halyk QR', 'Forte QR']

export const PaymentMethodView = ({ total, onBack, onSelect }: PaymentMethodViewProps) => {
    return (
        <Box sx={{ width: '40%' }}>
            <Typography variant="h5" sx={{ marginBottom: '40px' }}>
                Payment method
            </Typography>

            {paymentMethods.map((method, idx) => (
                <Box
                    key={idx}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '10px 0',
                    }}
                >
                    <Box>
                        <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                            Payment
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600' }}>
                            {method}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: COLORS.blue,
                            color: COLORS.white,
                            padding: '10px 40px',
                            borderRadius: '10px',
                            fontWeight: 700,
                        }}
                        onClick={() => onSelect(method)}
                    >
                        Select
                    </Button>
                </Box>
            ))}

            <Typography sx={{ marginTop: '40px', fontSize: 18 }}>
                Total price: <span style={{ fontWeight: '600' }}>{total} kz</span>
            </Typography>

            <Box sx={{ marginTop: '40px' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: COLORS.blue,
                        color: COLORS.white,
                        padding: '7px 24px',
                        borderRadius: '10px',
                        fontWeight: 700,
                    }}
                    onClick={onBack}
                >
                    back
                </Button>
            </Box>
        </Box>
    )
}
