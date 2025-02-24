import { useState } from 'react'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Avatar,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '@/shared/style/colors'
import arrow from '@/assets/arrow.svg'
import { User } from '@/shared/api/user/types'

interface IEmployeeTableProps {
    employees: User[]
}

const EmployeeTable: React.FC<IEmployeeTableProps> = ({ employees }) => {
    const navigate = useNavigate()
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    return (
        <Box
            sx={{
                flex: 2,
                backgroundColor: COLORS.white,
                borderRadius: '24px',
                padding: '20px 30px',
            }}
        >
            <Box sx={{ backgroundColor: COLORS.white, borderRadius: '24px', padding: '5px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '10px 0',
                    }}
                >
                    <Typography variant="h6">Employees</Typography>
                    <Box
                        onClick={() => {
                            navigate('/employees')
                        }}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer',
                        }}
                    >
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: COLORS.blue,
                                fontWeight: 600,
                            }}
                            to="/employees"
                        >
                            View all
                        </Link>
                        <img src={arrow} alt="" />
                    </Box>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.slice(0, 5).map(employee => (
                            <TableRow key={employee.id} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar alt={employee.name} />
                                        <Typography variant="body2" ml={2}>
                                            {employee.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{employee.surname}</TableCell>
                                <TableCell>{employee.username}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.roles}</TableCell>
                                <TableCell>
                                    <Typography
                                        color={employee.is_active === false ? 'error' : 'success'}
                                    >
                                        {employee.is_active === true ? 'Active' : 'Inactive'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

export default EmployeeTable
