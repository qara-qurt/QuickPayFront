import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '@/assets/arrow.svg'
import { COLORS } from '@/shared/style/colors'
import { CashBoxCard } from '@/shared/ui'
import { ProductCard } from '@/shared/ui/cards/ProductCard'
import EmployeeTable from './EmployeeTable'

const products = [
    {
        name: 'Product 1',
        price: 100,
        totalCount: 10,
    },
    {
        name: 'Product 2',
        price: 200,
        totalCount: 20,
    },
    {
        name: 'Product 3',
        price: 300,
        totalCount: 30,
    },
]
const cashBoxes = [
    {
        id: 'PN0001265',
        name: 'Cash Box - 1',
        information: {
            createdAt: '2021-10-10',
            todayCash: 1000,
            totalCash: 22000,
            transactionalToday: 10,
            transactionalTotal: 100,
        },
    },
    {
        id: 'PN004265',
        name: 'Cash Box - 2',
        information: {
            createdAt: '2021-10-10',
            todayCash: 500,
            totalCash: 2000,
            transactionalToday: 5,
            transactionalTotal: 80,
        },
    },
    {
        id: 'PN0001365',
        name: 'Cash Box - 3',
        information: {
            createdAt: '2021-10-10',
            todayCash: 800,
            totalCash: 22000,
            transactionalToday: 15,
            transactionalTotal: 54,
        },
    },
]

export const All = () => {
    const navigate = useNavigate()

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    margin: '20px 0',
                }}
            >
                All widgets
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '40px',
                }}
            >
                <Box
                    sx={{
                        flex: 2,
                        backgroundColor: COLORS.white,
                        borderRadius: '24px',
                        padding: '20px 30px',
                    }}
                >
                    <EmployeeTable />
                </Box>
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
                                navigate('#')
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
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <Typography variant="body1">No products</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '40px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">Cash Boxes</Typography>
                    <Box
                        onClick={() => {
                            navigate('/cash-boxes')
                        }}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Link
                            to="#"
                            style={{
                                textDecoration: 'none',
                                color: COLORS.blue,
                                fontWeight: 600,
                                fontFamily: 'Nunito Sans, Arial, sans-serif',
                            }}
                        >
                            View all
                        </Link>
                        <img src={arrow} alt="" />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '20px',
                    }}
                >
                    {cashBoxes.length > 0 ? (
                        cashBoxes.map((cashBox, index) => (
                            <CashBoxCard key={index} cachBox={cashBox} />
                        ))
                    ) : (
                        <Typography variant="body1">No cash boxes</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
