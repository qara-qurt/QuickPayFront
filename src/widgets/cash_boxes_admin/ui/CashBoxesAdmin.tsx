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
import { useEffect, useState } from 'react'
import { CashBoxAdmin } from './CashBoxAdmin'
import { CashBox } from '@/shared/api/cashbox/types'
import { cashBoxApi } from '@/shared/api'
import add from '@/assets/add.svg'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { CreateCashBox } from '@/features/cashbox'

export const CashBoxesAdmin = () => {
    const [open, setOpen] = useState(false)
    const [cashBoxes, setCashBoxes] = useState<CashBox[]>([])
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

    const fetchCashBoxes = async (
        page: number,
        field: string,
        order: 'asc' | 'desc',
        name: string,
    ) => {
        try {
            const { data } = await cashBoxApi.getCashboxes(
                page + 1,
                rowsPerPage,
                field,
                order,
                name,
            )
            setCashBoxes(data.content)
            setTotalPages(data.totalPages)
            setTotalCount(data.totalElements)
        } catch (error) {
            console.error('Ошибка при получении cash-boxes', error)
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
        fetchCashBoxes(currentPage, sortField, sortOrder, searchQuery)
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
        fetchCashBoxes(0, sortField, sortOrder, val)
    }

    useEffect(() => {
        fetchCashBoxes(currentPage, sortField, sortOrder, searchQuery)
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
                    <Typography variant="h6">CashBoxes</Typography>
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
                    <CreateCashBox handleOpen={handleOpen} onUpdate={handleUpdate} />
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
                                    { label: 'Cashbox_ID', field: 'cashbox_id' },
                                    { label: 'Name', field: 'name' },
                                    { label: 'Company ID', field: 'company_id' },
                                    { label: 'Is Active', field: 'isActive' },
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
                                <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cashBoxes.map(cashBox => (
                                <CashBoxAdmin
                                    cashBox={cashBox}
                                    key={cashBox.id}
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
