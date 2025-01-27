import { Box, Tab, Tabs, Typography } from '@mui/material'
import blue_log from '@/assets/blue_logo.svg'
import support from '@/assets/Support.png'
import logout from '@/assets/logout.svg'
import all from '@/assets/all-menu.svg'
import cashBox from '@/assets/cashbox-menu.svg'
import emloyee from '@/assets/emloyee.svg'
import product from '@/assets/products-menu.svg'
import analytics from '@/assets/analytics-menu.svg'

import { COLORS } from '@/shared/style/colors'
import { Link } from 'react-router-dom'
import { All } from '@/widgets/all'
import { CashBoxes } from '@/widgets/cash_boxes'
import { useActiveTab } from '../hooks/useActiveTab'

const routeToTab: Record<string, number> = {
    '/all': 0,
    '/cash-boxes': 1,
    '/products': 2,
    '/employees': 3,
    '/analytics': 4,
}

const tabs = [
    {
        name: 'All',
        icon: all,
        component: <All />,
    },
    {
        name: 'Cash Boxes',
        icon: cashBox,
        component: <CashBoxes />,
    },
    {
        name: 'Products',
        icon: product,
        component: <All />,
    },
    {
        name: 'Employees',
        icon: emloyee,
        component: <All />,
    },
    {
        name: 'Analytics',
        icon: analytics,
        component: <All />,
    },
]

export const MainPage = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)

    return (
        <Box
            sx={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                display: 'flex',
                backgroundColor: COLORS.lightBlue,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    margin: '15px',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            marginBottom: '40px',
                        }}
                    >
                        <img src={blue_log} alt="logo" />
                    </Box>
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
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.name}
                                icon={<img src={tab.icon} alt={tab.name} />}
                                iconPosition="start"
                                sx={{
                                    marginLeft: '-10px',
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box>
                    <img src={support} alt="Support" />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '30px',
                        }}
                    >
                        <img src={logout} alt="Logout" />
                        <Link
                            to="#"
                            style={{
                                textDecoration: 'none',
                                color: COLORS.gray,
                                fontWeight: 600,
                            }}
                        >
                            <Typography variant="inherit">Logout</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 14,
                }}
            >
                {tabs.map((tabPanel, index) => (
                    <CustomTabPanel key={index} value={activeTab} index={index}>
                        {tabPanel.component}
                    </CustomTabPanel>
                ))}
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
