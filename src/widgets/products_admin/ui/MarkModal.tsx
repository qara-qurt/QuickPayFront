import { Product } from '@/shared/api/product/types'
import { COLORS } from '@/shared/style/colors'
import {
    Box,
    Button,
    Dialog,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { productMarkApi } from '@/shared/api/product_marks/product_marks'

interface IMarkModalProps {
    open: boolean
    handleOpen(): void
    product: Product
}

const token = localStorage.getItem('token') || ''

export const MarkModal: React.FC<IMarkModalProps> = ({ open, handleOpen, product }) => {
    const [marks, setMarks] = useState<string[]>([])
    const [newMarks, setNewMarks] = useState<string[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const stompClientRef = useRef<Client | null>(null)

    const toggleAddingMode = () => setIsAdding(prev => !prev)

    const addUniqueMark = (newMark: string) => {
        setNewMarks(prev => (prev.includes(newMark) ? prev : [...prev, newMark]))
    }

    const handleBindMarks = async () => {
        try {
            await productMarkApi.bindMarkToProduct({ product_id: product.id, rfid_tags: newMarks })
            setMarks(prev => [...prev, ...newMarks])
            setNewMarks([])
            setIsAdding(false)
        } catch (error: any) {
            console.error('❌ Error while binding mark:', error)
            setError(error?.response?.data?.messages?.[0] || 'Error while binding mark')
        }
    }

    const deleteMark = async (mark: string, productId: number) => {
        try {
            await productMarkApi.deleteMarkFromProduct(productId, mark)
            setMarks(prev => prev.filter(m => m !== mark))
        } catch (err: any) {
            console.error('❌ Error while deleting mark:', err)
            setError(err?.response?.data?.messages?.[0] || 'Error while deleting mark')
        }
    }

    const fetchMarks = async () => {
        try {
            const response = await productMarkApi.getMarksByProductId(product.id)
            setMarks(Array.isArray(response) ? response : [])
        } catch (error: any) {
            console.error('❌ Error fetching marks:', error)
            setError(error?.response?.data?.messages?.[0] || 'Error fetching marks')
        }
    }

    useEffect(() => {
        if (!open) return
        fetchMarks()

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: { Authorization: `Bearer ${token}` },
            onConnect: () => {
                console.log('✅ Connected to WebSocket')
                client.subscribe('/topic/register-mark/PN00000001', message => {
                    const data = JSON.parse(message.body)
                    console.log(message)
                    if (data.rfid_tag) addUniqueMark(data.rfid_tag)
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
    }, [open])

    return (
        <Dialog
            open={open}
            onClose={handleOpen}
            sx={{ '& .MuiPaper-root': { borderRadius: '20px', minWidth: '800px' } }}
        >
            <Box sx={{ margin: '30px' }}>
                <Typography variant="h6">Product</Typography>
                <Box>
                    {[
                        `ID: ${product.id}`,
                        `Product: ${product.name}`,
                        `Price: ${product.price}`,
                        `Description: ${product.description}`,
                        `Sizes: ${product?.sizes?.join(', ') || ''}`,
                        `Colors: ${product?.colors?.join(', ') || ''}`,
                        `Created at: ${product.created_at}`,
                        `Count :${marks.length}`,
                    ].map((text, i) => (
                        <Typography key={i} variant="body2" fontSize="16px">
                            {text}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">Marks:</Typography>

                    {!isAdding ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    py: 1,
                                    fontWeight: 700,
                                    backgroundColor: COLORS.blue,
                                    textTransform: 'none',
                                    marginY: '10px',
                                }}
                                onClick={toggleAddingMode}
                            >
                                Add Mark
                            </Button>

                            <TableContainer
                                sx={{
                                    maxHeight: '600px',
                                    overflowY: 'auto',
                                    backgroundColor: COLORS.white,
                                    borderRadius: '20px',
                                }}
                            >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: COLORS.lightBlue }}>
                                            <TableCell sx={{ fontWeight: 700 }}>Marks</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {marks.map((mark, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{mark}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            borderRadius: 3,
                                                            py: 1,
                                                            fontWeight: 700,
                                                            backgroundColor: COLORS.red,
                                                            textTransform: 'none',
                                                        }}
                                                        onClick={() => deleteMark(mark, product.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    py: 1,
                                    fontWeight: 700,
                                    backgroundColor: COLORS.blue,
                                    textTransform: 'none',
                                    marginY: '10px',
                                }}
                                onClick={toggleAddingMode}
                            >
                                Back
                            </Button>

                            <Box>
                                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                                    New Marks
                                </Typography>
                                {newMarks.length > 0 ? (
                                    <>
                                        <TableContainer
                                            sx={{
                                                maxHeight: '600px',
                                                overflowY: 'auto',
                                                backgroundColor: COLORS.white,
                                                borderRadius: '20px',
                                            }}
                                        >
                                            <Table stickyHeader>
                                                <TableHead>
                                                    <TableRow
                                                        sx={{ backgroundColor: COLORS.lightBlue }}
                                                    >
                                                        <TableCell sx={{ fontWeight: 700 }}>
                                                            RFID Tag
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {newMarks.map((mark, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{mark}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                            {error && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: COLORS.red, marginTop: '10px' }}
                                                >
                                                    {error}
                                                </Typography>
                                            )}
                                        </TableContainer>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    marginTop: '10px',
                                                    borderRadius: 3,
                                                    py: 1,
                                                    fontWeight: 700,
                                                    backgroundColor: COLORS.green,
                                                    textTransform: 'none',
                                                }}
                                                onClick={handleBindMarks}
                                            >
                                                Bind
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {error && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: COLORS.red, marginTop: '10px' }}
                                            >
                                                {error}
                                            </Typography>
                                        )}
                                        <Typography>No new marks added yet.</Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Dialog>
    )
}

export default MarkModal
