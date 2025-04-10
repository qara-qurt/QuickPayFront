import { COLORS } from '@/shared/style/colors'
import {
    Box,
    Button,
    Dialog,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import add from '@/assets/add.svg'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Product } from './Product'
import { Product as TProduct } from '@/shared/api/product/types'
import { CreateProduct } from '@/features/product'
import { productApi } from '@/shared/api/product/productApi'

interface IProductsAdminProps {
    organization_id?: number
}

export const ProductsAdmin: React.FC<IProductsAdminProps> = ({ organization_id }) => {
    const [open, setOpen] = useState(false)
    const [product, setProducts] = useState<TProduct[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const rowsPerPage = 20
    const [totalPages, setTotalPages] = useState(0)
    const [sortField, setSortField] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [searchQuery, setSearchQuery] = useState('')

    const handleOpen = () => {
        setOpen(!open)
    }

    const fetchProducts = async (
        page: number,
        field: string,
        order: 'asc' | 'desc',
        search: string,
    ) => {
        try {
            const { data } = await productApi.getProducts(
                page + 1,
                rowsPerPage,
                field,
                order,
                search,
                organization_id,
            )
            setProducts(data.content)
            setTotalPages(data.totalPages)
            setTotalCount(data.totalElements)
        } catch (error) {
            console.error('Ошибка при получении products', error)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleUpdate = () => {
        fetchProducts(currentPage, sortField, sortOrder, searchQuery)
    }

    const handleSort = (field: string) => {
        const isAsc = sortField === field && sortOrder === 'asc'
        setSortOrder(isAsc ? 'desc' : 'asc')
        setSortField(field)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setSearchQuery(val)
        setCurrentPage(0)
        fetchProducts(0, sortField, sortOrder, val)
    }

    useEffect(() => {
        fetchProducts(currentPage, sortField, sortOrder, searchQuery)
    }, [currentPage, sortField, sortOrder])

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px',
                }}
            >
                <Box>
                    <Typography variant="h6">Products</Typography>
                    <Typography variant="body2">{`Total: ${totalCount}`}</Typography>
                </Box>
                <Box>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearch}
                        sx={{
                            marginRight: '10px',
                            backgroundColor: COLORS.white,
                            borderRadius: '20px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.blue,
                            textTransform: 'none',
                        }}
                        onClick={handleOpen}
                    >
                        <img src={add} alt="" style={{ marginRight: '5px' }} />
                        Create
                    </Button>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleOpen}
                    sx={{ '& .MuiPaper-root': { borderRadius: '20px' } }}
                >
                    <CreateProduct handleOpen={handleOpen} onUpdate={handleUpdate} />
                </Dialog>
            </Box>
            <Box>
                <TableContainer
                    sx={{
                        maxHeight: '75vh',
                        overflowY: 'auto',
                        backgroundColor: COLORS.white,
                        borderRadius: '20px',
                    }}
                >
                    <Table aria-labelledby="tableTitle" stickyHeader>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: COLORS.lightBlue, fontWeight: 700 }}>
                                {[
                                    { label: 'ID', field: 'id' },
                                    { label: 'Name', field: 'name' },
                                    { label: 'Description', field: 'description' },
                                    { label: 'Price', field: 'price' },
                                    { label: 'Sizes', field: 'sizes' },
                                    { label: 'Image', field: 'image' },
                                    { label: 'Colors', field: 'colors' },
                                    { label: 'Organization ID', field: 'organization_id' },
                                    { label: 'Created At', field: 'createdAt' },
                                    { label: 'Updated At', field: 'updatedAt' },
                                ].map(({ label, field }) => (
                                    <TableCell key={field} sx={{ fontWeight: 700 }}>
                                        <TableSortLabel
                                            active={sortField === field}
                                            direction={sortField === field ? sortOrder : 'asc'}
                                            onClick={() => handleSort(field)}
                                        >
                                            {label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell sx={{ fontWeight: 700 }}>Edit</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Mark</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map(product => (
                                <Product
                                    product={product}
                                    key={product.id}
                                    onUpdate={handleUpdate}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {totalPages > 1 && (
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
                    <Typography variant="body2">{`${currentPage + 1} / ${totalPages}`}</Typography>
                    <IconButton onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                        <KeyboardArrowRight />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}
