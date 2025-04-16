import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import { Transactions } from './Transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { COLORS } from '@/shared/style/colors'
import { useEffect, useState } from 'react'
import { paymentApi } from '@/shared/api/payment/paymentApi'
import { PaymentResponse } from '@/shared/api/payment/types'

const routeToTab: Record<string, number> = {
    '/cash-boxes?id=PN0001265': 0,
    '/cash-boxes?id=PN0002365': 1,
    '/cash-boxes?id=PN0002265': 2,
}

export const CashBoxes = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const cashBoxes = useSelector((state: RootState) => state.cashBoxes.data)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const organization = useSelector((state: RootState) => state.users.organization)

    const [transactions, setTransactions] = useState<PaymentResponse[]>([])

    const currentCashbox = cashBoxes[activeTab]

    useEffect(() => {
        if (currentCashbox && organization?.id) {
            paymentApi
                .getPaymentsByOrganizationAndCashboxIds(organization.id, currentCashbox.cashbox_id)
                .then(data => setTransactions(data))
                .catch(err => {
                    console.error('Error fetching transactions:', err)
                    setTransactions([])
                })
        }
        console.log('Cashbox:', transactions)
    }, [activeTab, cashBoxes, organization])

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
