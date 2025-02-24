import { Product } from '@/shared/api/product/types'
import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'

interface IProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: IProductCardProps) => {
    return (
        <Box
            sx={{
                margin: '20px 0',
                padding: '20px',
                borderLeft: `5px solid ${COLORS.blue}`,
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: COLORS.blue,
                    marginBottom: '10px',
                }}
            >
                {product.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px', fontSize: '16px' }}>
                Price: <span style={{ fontWeight: 600 }}>{product.price} KZT</span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>
                Total Count:
            </Typography>
        </Box>
    )
}
