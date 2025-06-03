import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
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
    // Стейт для всех транзакций
    const [transactions, setTransactions] = useState<PaymentResponse[]>([])
    // Стейт для URL iframe с метабазы
    const [frame, setFrame] = useState('')

    // Получаем cashBoxes из редакс стора
    const cashBoxes = useSelector((state: RootState) => state.cashBoxes.data)

    // Загружаем транзакции при наличии cashBoxes
    useEffect(() => {
        if (cashBoxes.length > 0) {
            paymentApi
                .getPaymentsByOrganizationAndCashboxIds(cashBoxes[0].organization_id)
                .then(res => {
                    setTransactions(res.data as PaymentResponse[])
                })
                .catch(err => {
                    console.error('Error fetching payments:', err)
                })
        }
    }, [cashBoxes])

    // Загружаем ссылку для iframe с метабазы при монтировании
    useEffect(() => {
        const fetchMetabase = async () => {
            try {
                const response = await fetch('http://44.223.86.151:8080/api/analytics/embed-url', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                const data = await response.json()
                setFrame(data.iframeUrl)
            } catch (error) {
                console.error('Error fetching Metabase data:', error)
            }
        }

        fetchMetabase()
    }, [])

    // Получаем сегодняшнюю дату
    const today = new Date()

    // Фильтруем транзакции только за сегодня
    const todayTransactions =
        transactions?.filter(transaction => isSameDay(new Date(transaction.created_at), today)) ??
        []

    // Считаем сумму продаж за сегодня
    const todayCash = todayTransactions.reduce(
        (acc, transaction) => acc + transaction.totalAmount,
        0,
    )

    // Считаем количество проданных товаров сегодня
    const soldItems = todayTransactions.reduce(
        (acc, transaction) => acc + transaction.products.length,
        0,
    )

    // Средний чек
    const avgPurchase =
        todayTransactions.length > 0 ? Math.round(todayCash / todayTransactions.length) : 0

    // Статистика для отображения
    const stats = [
        { title: 'Total Revenue Today', value: `${todayCash} KZT` },
        { title: 'Transactions Today', value: `${todayTransactions.length}` },
        { title: 'Sold Items', value: `${soldItems}` },
        { title: 'Avg. Purchase Value', value: `${avgPurchase} KZT` },
    ]

    // Подсчет топ-5 продуктов по количеству продаж за все время
    const productCount: Record<string, number> = {}
    transactions?.forEach(transaction => {
        transaction.products.forEach(product => {
            const name = product.name || 'Unnamed Product'
            productCount[name] = (productCount[name] || 0) + 1
        })
    })
    // Создаем массив последних 7 дней
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i))
    const salesByDay: Record<string, number> = {}
    last7Days.forEach(date => {
        const key = format(date, 'yyyy-MM-dd')
        salesByDay[key] = 0
    })

    // Считаем выручку по каждому дню из последних 7
    transactions?.forEach(transaction => {
        const transactionDate = new Date(transaction.created_at)
        last7Days.forEach(day => {
            if (isSameDay(transactionDate, day)) {
                const key = format(day, 'yyyy-MM-dd')
                salesByDay[key] += transaction.totalAmount
            }
        })
    })

    // Формируем данные для графика
    const salesData = last7Days.map(date => ({
        date: format(date, 'MMM dd'),
        revenue: salesByDay[format(date, 'yyyy-MM-dd')],
    }))

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Analytics Overview
            </Typography>

            {/* Карточки с ключевой статистикой */}
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

            {/* График продаж за последние 7 дней */}
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

            <Box
                mt={5}
                sx={{
                    width: '100%',
                    height: '2800px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
            >
                <iframe
                    src={frame}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        overflow: 'hidden',
                    }}
                />
            </Box>
        </Box>
    )
}
