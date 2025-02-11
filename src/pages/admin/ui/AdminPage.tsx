import { Box, Tab, Tabs, Typography } from '@mui/material'
import blue_log from '@/assets/blue_logo.svg'
import support from '@/assets/Support.png'
import logout_icon from '@/assets/logout.svg'
import all from '@/assets/all-menu.svg'
import cashBox from '@/assets/cashbox-menu.svg'
import emloyee from '@/assets/emloyee.svg'
import product from '@/assets/products-menu.svg'
import analytics from '@/assets/analytics-menu.svg'

import { COLORS } from '@/shared/style/colors'
import { Link, useNavigate } from 'react-router-dom'
import { All } from '@/widgets/all'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/model/authSlice'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import { Companies } from '@/widgets/companies/ui/Companies'
import { CashBoxesAdmin } from '@/widgets/cash_boxes_admin/ui/CashBoxesAdmin'

const routeToTab: Record<string, number> = {
    '/admin-companies': 0,
    '/admin-cash-boxes': 1,
    '/admin-products': 2,
    '/admin-employees': 3,
    '/admin-analytics': 4,
}

const tabs = [
    {
        name: 'Companies',
        icon: all,
        component: <Companies />,
    },
    {
        name: 'Cash Boxes',
        icon: cashBox,
        component: <CashBoxesAdmin />,
    },
    {
        name: 'Products',
        icon: product,
        component: <All />,
    },
    {
        name: 'Users',
        icon: emloyee,
        component: <All />,
    },
    {
        name: 'Analytics',
        icon: analytics,
        component: <All />,
    },
]

export const AdminPage = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        setTimeout(() => {
            navigate('/sign-in')
        }, 0)
    }

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
                    position: 'fixed',
                    flex: 1,
                    backgroundColor: COLORS.white,
                    margin: '15px',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    height: '96vh',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            marginBottom: '40px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '10px',
                        }}
                    >
                        <img src={blue_log} alt="logo" />
                        <Typography variant="h6">Admin panel</Typography>
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
                                    width: '240px',
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
                        <img src={logout_icon} alt="Logout" />
                        <Link
                            to="#"
                            style={{
                                textDecoration: 'none',
                                color: COLORS.gray,
                                fontWeight: 600,
                            }}
                            onClick={handleLogout}
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
        <Box
            hidden={value !== index}
            sx={{
                width: '1440px',
                margin: '0 auto',
            }}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    )
}
