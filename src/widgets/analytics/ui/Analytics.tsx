import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import { COLORS } from '@/shared/style/colors'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { useEffect, useState } from 'react'
import { paymentApi } from '@/shared/api/payment/paymentApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { PaymentResponse } from '@/shared/api/payment/types'
import { format, subDays, isSameDay } from 'date-fns'

export const Analytics = () => {
    const [transactions, setTransactions] = useState<PaymentResponse[]>([])
    const cashBoxes = useSelector((state: RootState) => state.cashBoxes.data)
    const link = `http://localhost:8501/transactions?organization_id=${cashBoxes[0].organization_id}`

    useEffect(() => {
        if (cashBoxes.length > 0) {
            paymentApi
                .getPaymentsByOrganizationAndCashboxIds(cashBoxes[0].organization_id)
                .then(res => {
                    setTransactions(res as PaymentResponse[])
                })
                .catch(err => {
                    console.error('Error fetching payments:', err)
                })
        }
    }, [cashBoxes])

    const today = new Date()
    const todayTransactions = transactions.filter(transaction => {
        const createdAtDate = new Date(transaction.created_at)
        return (
            createdAtDate.getDate() === today.getDate() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getFullYear() === today.getFullYear()
        )
    })

    const todayCash = todayTransactions.reduce(
        (acc, transaction) => acc + transaction.totalAmount,
        0,
    )

    const soldItems = todayTransactions.reduce(
        (acc, transaction) => acc + transaction.products.length,
        0,
    )

    const avgPurchase =
        todayTransactions.length > 0 ? Math.round(todayCash / todayTransactions.length) : 0

    const stats = [
        { title: 'Total Revenue Today', value: `${todayCash} KZT` },
        { title: 'Transactions Today', value: `${todayTransactions.length}` },
        { title: 'Sold Items', value: `${soldItems}` },
        { title: 'Avg. Purchase Value', value: `${avgPurchase} KZT` },
    ]

    // 🔹 Top Products
    const productCount: Record<string, number> = {}

    transactions.forEach(transaction => {
        transaction.products.forEach(product => {
            const name = product.name || 'Unnamed Product'
            productCount[name] = (productCount[name] || 0) + 1
        })
    })

    const topProducts = Object.entries(productCount)
        .map(([name, sold]) => ({ name, sold }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)

    // 🔹 Last 7 days sales
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i))
    const salesByDay: Record<string, number> = {}

    last7Days.forEach(date => {
        const key = format(date, 'yyyy-MM-dd')
        salesByDay[key] = 0
    })

    transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.created_at)
        last7Days.forEach(day => {
            if (isSameDay(transactionDate, day)) {
                const key = format(day, 'yyyy-MM-dd')
                salesByDay[key] += transaction.totalAmount
            }
        })
    })

    const salesData = last7Days.map(date => ({
        date: format(date, 'MMM dd'), // eg: 'Apr 19'
        revenue: salesByDay[format(date, 'yyyy-MM-dd')],
    }))

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Analytics Overview
            </Typography>

            <Grid container spacing={3}>
                {stats.map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Card
                            sx={{
                                backgroundColor: COLORS.white,
                                borderRadius: '16px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* 🔹 Sales Chart */}
            <Box mt={5}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Sales Trend (Last 7 Days)
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {/* 🔹 Top Products */}
            <Box mt={5}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Best Selling Products
                </Typography>
                <List
                    sx={{
                        backgroundColor: COLORS.white,
                        borderRadius: '12px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        maxWidth: '400px',
                    }}
                >
                    {topProducts.map((product, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={product.name}
                                secondary={`Sold: ${product.sold}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* 🔹 Link to full analytics */}
            <Box mt={5} textAlign="center">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2979ff',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        ':hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                    href={link}
                    target="_blank"
                >
                    Go to Detailed Analytics →
                </Button>
            </Box>
        </Box>
    )
}
