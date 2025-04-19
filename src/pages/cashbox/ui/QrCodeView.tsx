import { Box, Typography, Button, Snackbar, Alert } from '@mui/material'
import { COLORS } from '@/shared/style/colors'
import qr_image from '@/assets/qr.svg'
import { paymentApi } from '@/shared/api/payment/paymentApi'
import { useState } from 'react'
import { Product } from '@/shared/api/product/types'

interface QrCodeViewProps {
    organizationId: number
    cashboxId: string
    data: Product[]
    method: string
    onBack: () => void
    onConfirm?: () => void
}

export const QrCodeView = ({
    organizationId,
    cashboxId,
    data,
    method,
    onBack,
    onConfirm,
}: QrCodeViewProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const totalAmount = data.reduce((total, p) => total + p.price, 0)

    const handlePay = () => {
        if (loading) return
        setLoading(true)

        paymentApi
            .createPayment({
                cashboxId,
                organizationId,
                productIds: data.map(p => p.id),
                totalAmount: totalAmount,
                paymentMethod: method,
            })
            .then(res => {
                console.log('Payment successful:', res)
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    onBack()
                }, 2000)
            })
            .catch(err => {
                console.error('Payment error:', err)
            })
            .finally(() => setLoading(false))
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Scan to pay with {method}
            </Typography>
            <img
                src={qr_image}
                alt="QR Code"
                style={{ width: '300px', height: '300px', cursor: 'pointer' }}
                onClick={handlePay}
            />
            <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Total price: {totalAmount} KZ
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
                    disabled={loading}
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
                        disabled={loading}
                    >
                        Confirm
                    </Button>
                )}
            </Box>

            <Snackbar open={open} autoHideDuration={2000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Payment successful!
                </Alert>
            </Snackbar>
        </Box>
    )
}
