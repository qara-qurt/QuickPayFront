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
import { useState } from 'react'

interface IMarkModalProps {
    open: boolean
    handleOpen(): void
    product: Product
}

export const MarkModal: React.FC<IMarkModalProps> = ({ open, handleOpen, product }) => {
    const [marks, setMarks] = useState([
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
        'GFT123JGSlGVJ2234',
    ])

    const [isAddMark, setIsAddMark] = useState(false)

    const handleIsAddMark = () => {
        setIsAddMark(!isAddMark)
    }
    return (
        <Dialog
            open={open}
            onClose={handleOpen}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                    minWidth: '800px',
                },
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    margin: '30px',
                }}
            >
                <Box>
                    <Typography variant="h6">Product</Typography>
                    <Box>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`ID: ${product.id}`}</Typography>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`Product: ${product.name}`}</Typography>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`Price: ${product.price}`}</Typography>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`Description: ${product.description}`}</Typography>
                        <Typography variant="body2" fontSize={'16px'}>{`Sizes: ${product.sizes.join(
                            ', ',
                        )}`}</Typography>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`Colors: ${product.colors.join(', ')}`}</Typography>
                        <Typography
                            variant="body2"
                            fontSize={'16px'}
                        >{`Created at: ${product.created_at}`}</Typography>
                    </Box>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">Marks:</Typography>
                    {!isAddMark ? (
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
                                onClick={handleIsAddMark}
                            >
                                Add Mark
                            </Button>
                            <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
                                <TableContainer
                                    sx={{
                                        maxHeight: '600px',
                                        overflowY: 'auto',
                                        backgroundColor: COLORS.white,
                                        borderRadius: '20px',
                                    }}
                                >
                                    <Table aria-labelledby="tableTitle" stickyHeader>
                                        <TableHead>
                                            <TableRow
                                                sx={{
                                                    backgroundColor: COLORS.lightBlue,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                <TableCell sx={{ fontWeight: 700 }}>
                                                    Marks
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>
                                                    Delete
                                                </TableCell>
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
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
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
                                onClick={handleIsAddMark}
                            >
                                Back
                            </Button>
                            <Box>Register Mark here</Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Dialog>
    )
}
