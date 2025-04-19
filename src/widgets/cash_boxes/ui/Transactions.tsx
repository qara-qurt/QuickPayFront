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
import { CashBox } from '@/shared/api/cashbox/types'
import { PaymentResponse } from '@/shared/api/payment/types'
import { formatDate } from '@/shared/utils/formatDate'

interface ITransactionsProps {
    transactions: PaymentResponse[]
    cashBox: CashBox
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
        navigate(`/cash-boxes/${cashBox.cashbox_id}/view`)
    }

    const today = new Date()
    const todayTransactions = transactions.filter(transaction => {
        const createdAtDate = new Date(transaction.created_at)
        return (
            createdAtDate.getDate() === today.getDate() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getFullYear() === today.getFullYear()
        )
    })

    const todayCash = todayTransactions.reduce((acc, transaction) => {
        return acc + transaction.totalAmount
    }, 0)

    const totalCash = transactions.reduce((acc, transaction) => {
        return acc + transaction.totalAmount
    }, 0)

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
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                <TableCell>{transaction.paymentMethod}</TableCell>
                                <TableCell>
                                    {transaction.products.map((product, index) => (
                                        <Typography
                                            key={`${transaction.id}-${index}`}
                                            variant="body2"
                                        >
                                            {product.name}
                                        </Typography>
                                    ))}
                                </TableCell>

                                <TableCell>{transaction.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    color: COLORS.white,
                    backgroundColor: COLORS.blue,
                    borderRadius: '20px',
                    padding: '20px 20px',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography>Today Cash</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {todayCash}
                        {' kz'}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Total Cash</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {totalCash}
                        {' kz'}
                    </Typography>
                </Box>
            </Box>

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
