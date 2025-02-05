import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import blue_logo from '@/assets/blue_logo.svg'
import banner from '@/assets/banner.png'
import arrow from '@/assets/arrow_back.svg'
import { useEffect } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const cashBox = {
    id: 'PN0001345',
    name: 'Cash Box - 1',
}

const clothes = [
    {
        name: 'Product 1',
        price: 100,
        count: 2,
    },
    {
        name: 'Product 2',
        price: 200,
        count: 3,
    },
    {
        name: 'Product 3',
        price: 300,
        count: 4,
    },
    {
        name: 'Product 4',
        price: 400,
        count: 5,
    },
]

const token = localStorage.getItem('token') || ''

export const CashBoxPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log('Connected to WebSocket server')
                client.subscribe('/topic/cash-boxes', message => {
                    console.log('Received message:', message.body)
                })
            },
            onStompError: error => {
                console.error('STOMP Error:', error)
            },
        })

        client.activate()

        setTimeout(() => {
            if (client.connected) {
                client.publish({
                    destination: '/app/test',
                    body: JSON.stringify({ message: 'Hello, this is a test message!' }),
                })
                client.publish({
                    destination: '/app/test',
                    body: JSON.stringify({ message: 'Hello, this is a test message!' }),
                })
                client.publish({
                    destination: '/app/test',
                    body: JSON.stringify({ message: 'Hello, this is a test message!' }),
                })
                client.publish({
                    destination: '/app/test',
                    body: JSON.stringify({ message: 'Hello, this is a test message!' }),
                })
            }
        }, 2000)

        return () => {
            client.deactivate()
        }
    }, [])

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
                        {cashBox.name}
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
                    {clothes.length > 0 ? (
                        <Box>
                            <Typography variant="h6">Clothes</Typography>
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
