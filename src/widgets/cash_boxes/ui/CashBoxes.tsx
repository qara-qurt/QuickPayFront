import { COLORS } from '@/shared/style/colors'
import {
    Box,
    Button,
    IconButton,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import { useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const routeToTab: Record<string, number> = {
    '/cash-boxes?id=1': 0,
    '/cash-boxes?id=2': 1,
    '/cash-boxes?id=3': 2,
    '/cash-boxes?id=4': 3,
    '/cash-boxes?id=5': 4,
}

const cashBoxes = [
    { id: 'PN0001265', name: 'Cash Box - 1' },
    { id: 'PN0002365', name: 'Cash Box - 2' },
    { id: 'PN0001265', name: 'Cash Box - 3' },
]

const transactions = [
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0002365',
        date: '2021-10-11 14:00',
        payment: 'Credit Card',
        totalPrice: 1200,
    },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
    { transaction_id: 'PN0003465', date: '2021-10-12 15:30', payment: 'Cash', totalPrice: 500 },
]

export const CashBoxes = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 10

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

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginY: '24px',
                }}
            >
                <Typography variant="h5">Cash Boxes</Typography>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        fontWeight: 700,
                        backgroundColor: COLORS.blue,
                        textTransform: 'none',
                    }}
                >
                    CashBox
                </Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        backgroundColor: COLORS.white,
                        minHeight: '85vh',
                        width: '200px',
                        padding: '20px 25px',
                        borderRadius: '24px',
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        orientation="vertical"
                        sx={{
                            '& .MuiTab-root': { justifyContent: 'flex-start', textAlign: 'left' },
                        }}
                    >
                        {cashBoxes.map((cashBox, index) => (
                            <Tab
                                key={index}
                                label={
                                    <Box>
                                        <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                                            {cashBox.id}
                                        </Typography>
                                        <Typography
                                            variant="inherit"
                                            sx={{ fontWeight: 700, marginTop: '5px' }}
                                        >
                                            {cashBox.name}
                                        </Typography>
                                    </Box>
                                }
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <CustomTabPanel value={activeTab} index={0}>
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
                        </Box>

                        <TableContainer sx={{ maxHeight: 650, overflowY: 'auto' }}>
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
                                    <TableRow
                                        sx={{ backgroundColor: COLORS.lightBlue, fontWeight: 700 }}
                                    >
                                        <TableCell sx={{ fontWeight: 700 }}>
                                            Transaction ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedRows.map(transaction => (
                                        <TableRow key={transaction.transaction_id}>
                                            <TableCell>{transaction.transaction_id}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.payment}</TableCell>
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
                                disabled={
                                    currentPage === Math.ceil(transactions.length / rowsPerPage) - 1
                                }
                            >
                                <KeyboardArrowRight />
                            </IconButton>
                        </Box>
                    </CustomTabPanel>
                    {/* Repeat CustomTabPanel for other tabs if necessary */}
                </Box>
            </Box>
        </Box>
    )
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}
