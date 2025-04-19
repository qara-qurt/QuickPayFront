import { useEffect, useState } from 'react'
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
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { paymentApi } from '@/shared/api/payment/paymentApi'
import { PaymentResponse } from '@/shared/api/payment/types'
import { CashBox } from '@/shared/api/cashbox/types'
import { COLORS } from '@/shared/style/colors'
import { formatDate } from '@/shared/utils/formatDate'

interface TransactionsProps {
    cashBox: CashBox
}

export const Transactions = ({ cashBox }: TransactionsProps) => {
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<PaymentResponse[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const rowsPerPage = 20

    const fetchTransactions = async () => {
        setIsLoading(true)
        try {
            const res = await paymentApi.getPaymentsByOrganizationAndCashboxIds(
                cashBox.organization_id,
                cashBox.cashbox_id,
                currentPage,
                rowsPerPage,
            )
            console.log(res)
            setTransactions(Array.isArray(res.data) ? res.data : [])
            setTotalCount(res.totalCount || 0) // ✅ вот это важно!
        } catch (err) {
            console.error('Error fetching transactions:', err)
            setTransactions([])
            setTotalCount(0)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [cashBox.cashbox_id, currentPage])

    const handleNavigateToCashBox = () => {
        navigate(`/cash-boxes/${cashBox.cashbox_id}/view`)
    }

    const today = new Date()

    const todayCash = transactions?.length
        ? transactions
              .filter(t => {
                  const d = new Date(t.created_at)
                  return (
                      d.getFullYear() === today.getFullYear() &&
                      d.getMonth() === today.getMonth() &&
                      d.getDate() === today.getDate()
                  )
              })
              .reduce((sum, t) => sum + t.totalAmount, 0)
        : 0

    const totalCash = transactions?.length
        ? transactions.reduce((sum, t) => sum + t.totalAmount, 0)
        : 0

    return (
        <>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography variant="h6">Transactions</Typography>
                    <Typography variant="inherit">{totalCount}</Typography>
                </Box>
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

            {/* Table */}
            <TableContainer
                sx={{
                    maxHeight: '75vh',
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    border: '1px solid #e0e0e0',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: COLORS.lightBlue }}>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && transactions.length > 0 ? (
                            transactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                    <TableCell>{transaction.paymentMethod}</TableCell>
                                    <TableCell>
                                        {transaction.products.map((product, index) => (
                                            <Typography key={index} variant="body2">
                                                {product.name}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell>{transaction.totalAmount}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography variant="body2" textAlign="center" sx={{ py: 2 }}>
                                        {isLoading ? 'Loading...' : 'No transactions found'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Cash Summary */}
            <Box
                sx={{
                    backgroundColor: COLORS.blue,
                    color: COLORS.white,
                    borderRadius: '20px',
                    p: 2,
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography>Today Cash</Typography>
                    <Typography variant="h6">{todayCash} kz</Typography>
                </Box>
                <Box>
                    <Typography>Total Cash</Typography>
                    <Typography variant="h6">{totalCash} kz</Typography>
                </Box>
            </Box>

            {/* Pagination */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    mt: 2,
                }}
            >
                <IconButton
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant="body2">
                    Page {currentPage} of {Math.max(1, Math.ceil(totalCount / rowsPerPage))}
                </Typography>
                <IconButton
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalCount / rowsPerPage)}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Box>
        </>
    )
}
