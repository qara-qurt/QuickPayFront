import { Box, Button, Typography } from '@mui/material'
import { COLORS } from '@/shared/style/colors'
import bucket from '@/assets/bucket.jpg'
import { Product } from '@/shared/api/product/types'
import { ProductCard } from '@/shared/ui/cards/ProductCard'

interface CartViewProps {
    data: Product[]
    onPay: () => void
}

export const CartView = ({ data, onPay }: CartViewProps) => {
    const total = data.reduce((acc, p) => acc + p.price, 0)

    if (data.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={bucket} alt="Banner" width={'35%'} />
                <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '-10px' }}>
                    Put clothes in a bucket
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ minWidth: 0 }}>
            <Box>
                {data.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '60px',
                }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                    Total price: {total} KZ
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: COLORS.blue,
                        color: COLORS.white,
                        padding: '10px 40px',
                        borderRadius: '10px',
                        fontWeight: 700,
                    }}
                    onClick={onPay}
                >
                    Pay
                </Button>
            </Box>
        </Box>
    )
}
