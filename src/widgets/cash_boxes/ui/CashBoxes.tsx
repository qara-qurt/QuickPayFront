import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import { Transactions } from './Transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { COLORS } from '@/shared/style/colors'

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
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Cash Boxes
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: COLORS.white,
                        width: { xs: '100%', md: '240px' },
                        borderRadius: '24px',
                        p: 2,
                        maxHeight: { xs: 'auto', md: '85vh' },
                        overflowY: 'auto',
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        orientation={isMobile ? 'horizontal' : 'vertical'}
                        variant="scrollable"
                        scrollButtons={isMobile ? 'auto' : false}
                        allowScrollButtonsMobile
                        sx={{
                            '& .MuiTab-root': {
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                minHeight: 'auto',
                                paddingY: 1.5,
                            },
                        }}
                    >
                        {cashBoxes.map(cashBox => (
                            <Tab
                                key={cashBox.cashbox_id}
                                label={
                                    <Box>
                                        <Typography variant="caption" color={COLORS.gray}>
                                            {cashBox.cashbox_id}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 700, mt: 0.5 }}
                                        >
                                            {cashBox.name}
                                        </Typography>
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ flex: 1, width: '100%' }}>
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
            {value === index && <Box sx={{ pt: 0 }}>{children}</Box>}
        </div>
    )
}
