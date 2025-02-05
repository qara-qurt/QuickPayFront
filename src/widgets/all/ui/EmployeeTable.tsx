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

const employees = [
    {
        id: '1',
        name: 'Serikov Dias',
        position: 'CEO',
        company: 'TechCorp',
        avatarUrl: '',
        isVerified: true,
        status: 'active',
    },
    {
        id: '2',
        name: 'Koksegen Erbol',
        position: 'Programmer',
        company: 'TechCorp',
        avatarUrl: '',
        isVerified: false,
        status: 'active',
    },
    {
        id: '3',
        name: 'John Doe',
        position: 'Designer',
        company: 'DesignPro',
        avatarUrl: '',
        isVerified: true,
        status: 'banned',
    },
    {
        id: '4',
        name: 'Jane Doe',
        position: 'Manager',
        company: 'BizInc',
        avatarUrl: '',
        isVerified: true,
        status: 'active',
    },
    {
        id: '5',
        name: 'Alex Smith',
        position: 'Developer',
        company: 'WebSolutions',
        avatarUrl: '',
        isVerified: false,
        status: 'inactive',
    },
    {
        id: '6',
        name: 'Anna Brown',
        position: 'HR',
        company: 'HRConsult',
        avatarUrl: '',
        isVerified: true,
        status: 'active',
    },
]

const EmployeeTable = () => {
    const navigate = useNavigate()
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    return (
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
                        navigate('#')
                    }}
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Link
                        to="/products"
                        style={{
                            textDecoration: 'none',
                            color: COLORS.blue,
                            fontWeight: 600,
                        }}
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
                        <TableCell>Position</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.slice(0, 5).map(employee => (
                        <TableRow key={employee.id} hover>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar src={employee.avatarUrl} alt={employee.name} />
                                    <Typography variant="body2" ml={2}>
                                        {employee.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.company}</TableCell>
                            <TableCell>
                                <Typography
                                    color={employee.status === 'banned' ? 'error' : 'success'}
                                >
                                    {employee.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default EmployeeTable
