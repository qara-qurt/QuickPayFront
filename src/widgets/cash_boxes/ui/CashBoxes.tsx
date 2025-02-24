import { COLORS } from '@/shared/style/colors'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import add from '@/assets/add.svg'
import { Transactions } from './Transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const routeToTab: Record<string, number> = {
    '/cash-boxes?id=PN0001265': 0,
    '/cash-boxes?id=PN0002365': 1,
    '/cash-boxes?id=PN0002265': 2,
}

const transactions = [
    {
        transaction_id: 'PN0101265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN2001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN3001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN4001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN5001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN6001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN7001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN8001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN9001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0011265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0021265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0031265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0041265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },

    {
        transaction_id: 'PN0006265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
]

export const CashBoxes = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const cashBoxes = useSelector((state: RootState) => state.cashBoxes.data)

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginY: '24px',
                }}
            >
                <Typography variant="h5">Cash Boxes</Typography>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        fontWeight: 700,
                        backgroundColor: COLORS.blue,
                        textTransform: 'none',
                    }}
                >
                    <img src={add} alt="" style={{ marginLeft: '-10px', marginRight: '10px' }} />
                    CashBox
                </Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        backgroundColor: COLORS.white,
                        minHeight: '85vh',
                        width: '200px',
                        padding: '20px 25px',
                        borderRadius: '24px',
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        orientation="vertical"
                        sx={{
                            '& .MuiTab-root': { justifyContent: 'flex-start', textAlign: 'left' },
                        }}
                    >
                        {cashBoxes.map(cashBox => (
                            <Tab
                                key={cashBox.cashbox_id}
                                label={
                                    <Box>
                                        <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                                            {cashBox.cashbox_id}
                                        </Typography>
                                        <Typography
                                            variant="inherit"
                                            sx={{ fontWeight: 700, marginTop: '5px' }}
                                        >
                                            {cashBox.name}
                                        </Typography>
                                    </Box>
                                }
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ flex: 1 }}>
                    {cashBoxes.map((cashBox, index) => (
                        <CustomTabPanel value={activeTab} index={index} key={cashBox.id}>
                            <Transactions transactions={transactions} cashBox={cashBox} />
                        </CustomTabPanel>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}
