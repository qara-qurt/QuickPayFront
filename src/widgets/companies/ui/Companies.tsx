import { COLORS } from '@/shared/style/colors'
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const companies = [
    {
        id: '1',
        bin: '123456789',
        name: 'TechCorp',
        isActive: true,
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
    },
    {
        id: '1',
        bin: '123456789',
        name: 'TechCorp',
        isActive: true,
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
    },
    {
        id: '1',
        bin: '123456789',
        name: 'TechCorp',
        isActive: true,
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
    },
    // Add more companies here...
]

export const Companies = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 20

    const handleNextPage = () => {
        if (currentPage < Math.ceil(companies.length / rowsPerPage) - 1) {
            setCurrentPage(prevPage => prevPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1)
        }
    }

    const paginatedRows = companies.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage,
    )

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px',
                }}
            >
                <Box>
                    <Typography variant="h6">Companies</Typography>
                    <Typography variant="inherit">{companies.length}</Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.blue,
                            textTransform: 'none',
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <TableContainer sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    component="div"
                    sx={{
                        '--TableCell-headBackground': '#f4f6f8',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': '#e8eaf0',
                        '--TableCell-paddingY': '8px',
                        '--TableCell-paddingX': '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        padding: '10px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: COLORS.lightBlue, fontWeight: 700 }}>
                            <TableCell sx={{ fontWeight: 700 }}>Company ID</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>BIN</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Is Active</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map(company => (
                            <TableRow key={company.id}>
                                <TableCell>{company.id}</TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.bin}</TableCell>
                                <TableCell>{company.isActive ? 'YES' : 'NO'}</TableCell>
                                <TableCell>{company.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {companies.length > 20 && (
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
                    <Typography variant="body2">{`${currentPage + 1} / ${Math.ceil(
                        companies.length / rowsPerPage,
                    )}`}</Typography>
                    <IconButton
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(companies.length / rowsPerPage) - 1}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </Box>
            )}
        </>
    )
}
