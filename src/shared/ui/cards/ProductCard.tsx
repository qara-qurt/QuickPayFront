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
                display: 'flex',
                gap: '20px',
                margin: '20px 0',
                padding: '20px',
                backgroundColor: COLORS.white,
                borderBottom: `0.5px solid ${COLORS.lightGray}`,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                    Product
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: COLORS.blue,
                    }}
                >
                    {product.name}
                </Typography>
                {/* <Typography variant="inherit">{product.colors.join(', ')}</Typography> */}
            </Box>
            <Box sx={{ flex: 3 }}>
                <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                    Information
                </Typography>
                <Typography>{product.description}</Typography>
                {/* <Typography>{product.sizes.join(', ')}</Typography> */}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                    Price
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '14px', minWidth: '70px' }}>
                    {product.price} KZ
                </Typography>
            </Box>
        </Box>
    )
}
