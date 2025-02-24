import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import blue_logo from '@/assets/blue_logo.svg'
import banner from '@/assets/banner.png'
import arrow from '@/assets/arrow_back.svg'
import { useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Product } from '@/shared/api/product/types'
import { ProductCard } from '@/shared/ui/cards/ProductCard'

const token = localStorage.getItem('token') || ''

export const CashBoxPage = () => {
    const [data, setData] = useState<Product[]>([])
    const { id } = useParams<{ id: string }>()
    const cashbox = useSelector((state: RootState) => state.cashBoxes.data).find(
        cashbox => cashbox.cashbox_id === id,
    )
    const navigate = useNavigate()
    const stompClientRef = useRef<Client | null>(null)

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (!id) return

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: { Authorization: `Bearer ${token}` },
            onConnect: () => {
                console.log(`✅ Connected to WebSocket for cashbox: /topic/cash-box/${id}`)

                client.subscribe(`/topic/cash-box/${id}`, message => {
                    const res: Product = JSON.parse(message.body)
                    setData(prev => {
                        if (!prev.some(item => item.id === res.id)) {
                            return [...prev, res]
                        }
                        return prev
                    })
                })
            },
            onStompError: error => console.error('❌ STOMP Error:', error),
        })

        client.activate()
        stompClientRef.current = client

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate()
            }
        }
    }, [id])

    return (
        <Box
            sx={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                backgroundColor: COLORS.lightBlue,
                width: '100%',
                height: '100vh',
                padding: '50px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: COLORS.white,
                    borderRadius: '10px',
                    maxWidth: '1440px',
                    height: '90vh',
                    margin: '0 auto',
                    padding: '36px 70px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{ display: 'flex', gap: '5px', marginBottom: '20px', cursor: 'pointer' }}
                    onClick={handleGoBack}
                >
                    <img src={arrow} alt="" />
                    <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                        Back
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '15px',
                    }}
                >
                    <img src={blue_logo} alt="" />
                    <Typography variant="h4">Quick Pay</Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: '50px',
                    }}
                >
                    <Typography
                        variant="inherit"
                        sx={{
                            color: COLORS.gray,
                        }}
                    >
                        {id}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        {cashbox?.name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '-150px',
                    }}
                >
                    {data.length > 0 ? (
                        <Box>
                            <Typography variant="h6">Clothes</Typography>
                            <Box>
                                {data.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <img src={banner} />
                            <Typography
                                variant="h4"
                                sx={{ textAlign: 'center', marginTop: '50px' }}
                            >
                                Put clothes in a bucket
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
