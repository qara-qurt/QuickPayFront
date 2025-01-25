import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '@/assets/arrow.svg'
import { COLORS } from '@/shared/style/colors'
import { EmployeeCard } from '@/shared/ui'
import { ProductCard } from '@/shared/ui/cards/ProductCard'

export const All = () => {
    const employees = [
        {
            name: 'Serikov',
            surname: 'Dias',
            position: 'CEO',
        },
        {
            name: 'Koksegen',
            surname: 'Erbol',
            position: 'Programmer',
        },
        {
            name: 'John',
            surname: 'Doe',
            position: 'CEO',
        },
        {
            name: 'John',
            surname: 'Doe',
            position: 'CEO',
        },
        {
            name: 'John',
            surname: 'Doe',
            position: 'CEO',
        },
        {
            name: 'John',
            surname: 'Doe',
            position: 'CEO',
        },
    ]
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
        {
            name: 'Product 3',
            price: 300,
            totalCount: 30,
        },
        {
            name: 'Product 3',
            price: 300,
            totalCount: 30,
        },
    ]
    const navigate = useNavigate()
    return (
        <Box>
            <Typography
                variant="h4"
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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '10px 0',
                        }}
                    >
                        <Typography variant="h5">Employees</Typography>
                        <Box
                            onClick={() => {
                                navigate('#')
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
                            flexWrap: 'wrap',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <EmployeeCard key={index} employee={employee} />
                            ))
                        ) : (
                            <Typography variant="body1">No employees</Typography>
                        )}
                    </Box>
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
                        <Typography variant="h5">Products</Typography>
                        <Box
                            onClick={() => {
                                navigate('#')
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
        </Box>
    )
}
