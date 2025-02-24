import { Box, Typography } from '@mui/material'
import EmployeeTable from './EmployeeTable'
import { RootState } from '@/app/store'
import { useSelector } from 'react-redux'
import { Products } from './Products'
import { CashBoxes } from './CashBoxes'

export const All = () => {
    const { products, users, cashBoxes } = useSelector((state: RootState) => state)

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    margin: '20px 0',
                }}
            >
                All widgets
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '40px',
                }}
            >
                <EmployeeTable employees={users.data} />
                <Products products={products.data} />
            </Box>
            <CashBoxes cashBoxes={cashBoxes.data} />
        </Box>
    )
}
