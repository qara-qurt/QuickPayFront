import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '@/assets/arrow.svg'
import { ProductCard } from '@/shared/ui/cards/ProductCard'
import { Product } from '@/shared/api/product/types'

interface IProductProps {
    products: Product[] | []
}

export const Products: React.FC<IProductProps> = ({ products }) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: COLORS.white,
                borderRadius: '24px',
                padding: '20px 30px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '10px 0',
                }}
            >
                <Typography variant="h6">Products</Typography>
                <Box
                    onClick={() => {
                        navigate('/products')
                    }}
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Link
                        to="/products"
                        style={{
                            textDecoration: 'none',
                            color: COLORS.blue,
                            fontWeight: 600,
                        }}
                    >
                        View all
                    </Link>
                    <img src={arrow} alt="" />
                </Box>
            </Box>
            <Box>
                {products.length > 0 ? (
                    products
                        .slice(0, 3)
                        .map((product, index) => <ProductCard key={index} product={product} />)
                ) : (
                    <Typography variant="body1">No products</Typography>
                )}
            </Box>
        </Box>
    )
}
