import { Box, Typography, Button } from '@mui/material'
import { COLORS } from '@/shared/style/colors'
import qr_image from '@/assets/qr.svg'

interface QrCodeViewProps {
    amount: number
    method: string
    onBack: () => void
    onConfirm?: () => void
}

export const QrCodeView = ({ amount, method, onBack, onConfirm }: QrCodeViewProps) => {
    const handlePay = () => {
        // Handle payment logic here
        console.log('Payment initiated')
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Scan to pay with {method}
            </Typography>
            <img
                src={qr_image}
                alt="QR Code"
                style={{ width: '300px', height: '300px' }}
                onClick={handlePay}
            />
            <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Total price: {amount} KZ
            </Typography>

            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: COLORS.blue,
                        color: COLORS.white,
                        padding: '8px 30px',
                        borderRadius: '10px',
                        fontWeight: 700,
                    }}
                    onClick={onBack}
                >
                    Back
                </Button>
                {onConfirm && (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: COLORS.green,
                            color: COLORS.white,
                            padding: '8px 30px',
                            borderRadius: '10px',
                            fontWeight: 700,
                        }}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                )}
            </Box>
        </Box>
    )
}
