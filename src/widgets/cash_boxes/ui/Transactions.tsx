import { COLORS } from '@/shared/style/colors'
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface ITransactionsProps {
    transactions: {
        transaction_id: string
        date: string
        payment: string
        products: { name: string; price: number; count: number }[]
        totalPrice: number
    }[]
    cashBox: {
        id: string
        name: string
    }
}

export const Transactions = ({ transactions, cashBox }: ITransactionsProps) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 20

    const handleNextPage = () => {
        if (currentPage < Math.ceil(transactions.length / rowsPerPage) - 1) {
            setCurrentPage(prevPage => prevPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1)
        }
    }

    const paginatedRows = transactions.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage,
    )

    const handleNavigateToCashBox = () => {
        navigate(`/cash-boxes/${cashBox.id}/view`)
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Box>
                    <Typography variant="h6">Transactions</Typography>
                    <Typography variant="inherit">1456</Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleNavigateToCashBox}
                        sx={{
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.blue,
                            textTransform: 'none',
                        }}
                    >
                        Open CashBox
                    </Button>
                </Box>
            </Box>

            <TableContainer sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    component="div"
                    sx={{
                        '--TableCell-headBackground': '#f4f6f8',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': '#e8eaf0',
                        '--TableCell-paddingY': '8px',
                        '--TableCell-paddingX': '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        padding: '10px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: COLORS.lightBlue, fontWeight: 700 }}>
                            <TableCell sx={{ fontWeight: 700 }}>Transaction ID</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Products</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map(transaction => (
                            <TableRow key={transaction.transaction_id}>
                                <TableCell>{transaction.transaction_id}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payment}</TableCell>
                                <TableCell>
                                    {transaction.products.map(product => (
                                        <Typography variant="body2">{product.name}</Typography>
                                    ))}
                                </TableCell>
                                <TableCell>{transaction.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                }}
            >
                <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant="body2">{`${currentPage + 1} / ${Math.ceil(
                    transactions.length / rowsPerPage,
                )}`}</Typography>
                <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(transactions.length / rowsPerPage) - 1}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Box>
        </>
    )
}
