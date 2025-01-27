import { COLORS } from '@/shared/style/colors'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import add from '@/assets/add.svg'
import { Transactions } from './Transactions'

const routeToTab: Record<string, number> = {
    '/cash-boxes?id=PN0001265': 0,
    '/cash-boxes?id=PN0002365': 1,
    '/cash-boxes?id=PN0002265': 2,
}

const cashBoxes = [
    { id: 'PN0001265', name: 'Cash Box - 1' },
    { id: 'PN0002365', name: 'Cash Box - 2' },
    { id: 'PN0002265', name: 'Cash Box - 3' },
]

const transactions = [
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },
    {
        transaction_id: 'PN0001265',
        date: '2021-10-10 13:40',
        payment: 'Kaspi QR',
        products: [
            { name: 'Product 1', price: 100, count: 2 },
            { name: 'Product 2', price: 200, count: 3 },
        ],
        totalPrice: 1400,
    },

    {
        transaction_id: 'PN0001265',
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
                        {cashBoxes.map((cashBox, index) => (
                            <Tab
                                key={index}
                                label={
                                    <Box>
                                        <Typography variant="inherit" sx={{ color: COLORS.gray }}>
                                            {cashBox.id}
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
                        <CustomTabPanel value={activeTab} index={index}>
                            <Transactions transactions={transactions} cashBox={cashBox} />
                        </CustomTabPanel>
                    ))}
                    {/* Repeat CustomTabPanel for other tabs if necessary */}
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
