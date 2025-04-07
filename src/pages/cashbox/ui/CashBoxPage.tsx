import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import blue_logo from '@/assets/blue_logo.svg'
import arrow from '@/assets/arrow_back.svg'
import { useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Product } from '@/shared/api/product/types'
import { CartView } from './CartView.tsx'
import { PaymentMethodView } from './PaymentMethodView.tsx'
import { QrCodeView } from './QrCodeView.tsx'

const token = localStorage.getItem('token') || ''

export const CashBoxPage = () => {
    const [step, setStep] = useState<'cart' | 'payment' | 'qr'>('payment')
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const [data, setData] = useState<Product[]>([])
    const { id } = useParams<{ id: string }>()
    const cashbox = useSelector((state: RootState) => state.cashBoxes.data).find(
        cashbox => cashbox.cashbox_id === id,
    )
    const navigate = useNavigate()
    const stompClientRef = useRef<Client | null>(null)

    const handleGoBack = () => {
        if (step === 'payment') {
            setStep('cart')
        } else if (step === 'qr') {
            setStep('payment')
            setSelectedMethod(null)
        } else {
            navigate(-1)
        }
    }

    const handlePay = () => {
        setStep('payment')
    }

    const handlePaymentSelect = (method: string) => {
        console.log('Selected payment method:', method)
        setSelectedMethod(method)
        setStep('qr')
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
                    <img src={arrow} alt="back" />
                    <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                        Back
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                    <img src={blue_logo} alt="logo" />
                    <Typography variant="h4">Quick Pay</Typography>
                </Box>
                <Box sx={{ marginTop: '50px' }}>
                    <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                        {id}
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: '10px' }}>
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
                    {step === 'qr' ? (
                        <QrCodeView
                            amount={data.reduce((total, p) => total + p.price, 0)}
                            method={selectedMethod ?? ''}
                            onBack={handleGoBack}
                        />
                    ) : step === 'cart' ? (
                        <CartView data={data} onPay={handlePay} />
                    ) : (
                        <PaymentMethodView
                            onSelect={handlePaymentSelect}
                            total={data.reduce((total, p) => total + p.price, 0)}
                            onBack={handleGoBack}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
