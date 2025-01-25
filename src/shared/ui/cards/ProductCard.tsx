import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'

interface IProductCardProps {
    product: {
        name: string
        price: number
        totalCount: number
    }
}

export const ProductCard = ({ product }: IProductCardProps) => {
    return (
        <Box
            sx={{
                margin: '20px 0',
                padding: '0px 20px',
                borderLeft: `5px solid ${COLORS.blue}`,
            }}
        >
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="inherit">Price : {product.price}kz</Typography>
            <Typography
                variant="inherit"
                sx={{
                    fontWeight: 500,
                }}
            >
                Total count : {product.totalCount}
            </Typography>
        </Box>
    )
}
