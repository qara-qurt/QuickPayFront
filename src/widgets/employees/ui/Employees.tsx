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
import { useState, useMemo } from 'react'
import add from '@/assets/add.svg'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Employee } from './Employee'
import { User as TUser } from '@/shared/api/user/types'
import { CreateUser } from '@/features/user'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/app/store'
import { fetchEmployees } from '@/features/user/store/userSlice'

export const Employees = () => {
    const role = useSelector((state: RootState) => state.auth.user?.roles[0])
    const organizationUsers = useSelector((state: RootState) => state.users?.data ?? [])
    const organization_id = useSelector((state: RootState) => state.users?.organization?.id)
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 20
    const [sortField, setSortField] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const filteredUsers = useMemo(() => {
        return organizationUsers
            .filter(user =>
                Object.values(user).some(
                    value =>
                        value !== null &&
                        value !== undefined &&
                        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            )
            .sort((a, b) => {
                const fieldA = a[sortField as keyof TUser]
                const fieldB = b[sortField as keyof TUser]

                if (fieldA === null || fieldA === undefined) return 1
                if (fieldB === null || fieldB === undefined) return -1

                if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1
                if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1
                return 0
            })
    }, [organizationUsers, searchQuery, sortField, sortOrder])

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)

    const handleOpen = () => {
        setOpen(!open)
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

    const handleSort = (field: string) => {
        const isAsc = sortField === field && sortOrder === 'asc'
        setSortOrder(isAsc ? 'desc' : 'asc')
        setSortField(field)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(0)
    }

    const handleUpdate = async () => {
        dispatch(fetchEmployees(organization_id))
    }

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
                    <Typography variant="h6">Users</Typography>
                    <Typography variant="body2">{`Total: ${filteredUsers.length}`}</Typography>
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
                            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                        }}
                    />
                    {(role === 'ADMIN' || role == 'ORGANIZATION_ADMIN') && (
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
                    )}
                </Box>
                <Dialog
                    open={open}
                    onClose={handleOpen}
                    sx={{ '& .MuiPaper-root': { borderRadius: '20px' } }}
                >
                    <CreateUser
                        handleOpen={handleOpen}
                        onUpdate={handleUpdate}
                        organization_id={organization_id}
                        creater_role={role}
                    />
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
                                    'id',
                                    'name',
                                    'surname',
                                    'username',
                                    'email',
                                    'isActive',
                                    'role',
                                    'createdAt',
                                    'updatedAt',
                                ].map(field => (
                                    <TableCell key={field} sx={{ fontWeight: 700 }}>
                                        <TableSortLabel
                                            active={sortField === field}
                                            direction={sortField === field ? sortOrder : 'asc'}
                                            onClick={() => handleSort(field)}
                                        >
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                {role === 'ADMIN' ||
                                    (role == 'ORGANIZATION_ADMIN' && (
                                        <>
                                            <TableCell sx={{ fontWeight: 700 }}>Edit</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
                                        </>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers
                                .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                                .map(user => (
                                    <Employee
                                        user={user}
                                        key={user.id}
                                        role={role}
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
