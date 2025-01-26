import { COLORS } from '@/shared/style/colors'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import add from '@/assets/add.svg'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import filter from '@/assets/filter.svg'
import { TransactionCard } from '@/shared/ui'

const routeToTab: Record<string, number> = {
    '/cash-boxes?id=1': 0,
    '/cash-boxes?id=2': 1,
    '/cash-boxes?id=3': 2,
    '/cash-boxes?id=4': 3,
    '/cash-boxes?id=5': 4,
}

const cashBoxes = [
    {
        id: 'PN0001265',
        name: 'Cash Box - 1',
    },
    {
        id: 'PN0002365',
        name: 'Cash Box - 2',
    },
    {
        id: 'PN0001265',
        name: 'Cash Box - 3',
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
                    <img src={add} alt="add" style={{ marginRight: 10, marginLeft: '-10px' }} />
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
                            '& .MuiTab-root': {
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                            },
                        }}
                    >
                        {cashBoxes.map((cashBox, index) => (
                            <Tab
                                key={index}
                                label={
                                    <Box>
                                        <Typography
                                            variant="inherit"
                                            sx={{
                                                color: COLORS.gray,
                                            }}
                                        >
                                            {cashBox.id}
                                        </Typography>
                                        <Typography
                                            variant="inherit"
                                            sx={{
                                                fontWeight: 700,
                                                marginTop: '5px',
                                            }}
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
                    <CustomTabPanel value={activeTab} index={0}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            <Box>
                                <Typography variant="h6">Transactions</Typography>
                                <Typography variant="inherit">1456</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: COLORS.white,
                                    paddingY: '7px',
                                }}
                            >
                                <img src={filter} alt="filter" />
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <TransactionCard />
                            <TransactionCard />
                            <TransactionCard />
                            <TransactionCard />
                            <TransactionCard />
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={1}>
                        item two
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={2}>
                        Item Three
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={3}>
                        Item Four
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={4}>
                        Item Five
                    </CustomTabPanel>
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
