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
import { CashBoxes } from '@/widgets/cash_boxes'
import { useActiveTab } from '../hooks/useActiveTab'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/features/auth/store/authSlice'
import { useEffect } from 'react'
import { fetchEmployees } from '@/features/user/store/userSlice'
import { RootState, AppDispatch } from '@/app/store'
import { fetchCashBoxes } from '@/features/cashbox/store/cashboxSlice'
import { fetchProducts } from '@/features/product/store/productSlice'
import { Employees } from '@/widgets/employees'
import { Products } from '@/widgets/products/ui/Products'
import { Analytics } from '@/widgets/analytics'

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
        component: <Products />,
    },
    {
        name: 'Employees',
        icon: emloyee,
        component: <Employees />,
    },
    {
        name: 'Analytics',
        icon: analytics,
        component: <Analytics />,
    },
]

export const MainPage = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        setTimeout(() => {
            navigate('/sign-in')
        }, 0)
    }

    useEffect(() => {
        if (user?.organization_id !== undefined) {
            dispatch(fetchEmployees(user.organization_id))
            dispatch(fetchProducts(user.organization_id))
            dispatch(fetchCashBoxes(user.organization_id))
        }
    }, [dispatch, user?.organization_id])

    return (
        <Box
            sx={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                display: 'flex',
                width: '100%',
                backgroundColor: COLORS.lightBlue,
                minHeight: '100vh',
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    position: 'fixed',
                    backgroundColor: COLORS.white,
                    margin: '15px',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    height: 'calc(100vh - 30px)',
                    width: { xs: '80px', sm: '200px' },
                    zIndex: 1000,
                }}
            >
                <Box>
                    <Box sx={{ marginBottom: '40px' }}>
                        <img src={blue_log} alt="logo" style={{ maxWidth: '100%' }} />
                    </Box>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        orientation="vertical"
                        sx={{
                            '& .MuiTab-root': {
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                minHeight: '48px',
                                paddingLeft: '8px',
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
                                    textTransform: 'none',
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box>
                    <Link
                        to="https://t.me/qara_qurtt"
                        style={{
                            textDecoration: 'none',
                            color: COLORS.gray,
                            fontWeight: 600,
                        }}
                    >
                        <img
                            src={support}
                            alt="Support"
                            style={{ width: '100%', cursor: 'pointer' }}
                        />
                    </Link>
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

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: { xs: '100px', sm: '230px' },
                    width: '100%',
                    padding: { xs: 1, sm: 2 },
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        marginBopxom: '-40px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: COLORS.white,
                            color: COLORS.black,
                            padding: '14px 22px',
                            borderRadius: '24px',
                            margin: '20px',
                            marginBottom: '-30px',
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>
                            {user?.surname + ' ' + user?.name}
                        </Typography>
                    </Box>
                </Box>
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
                width: '100%',
                maxWidth: '1440px',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}
            {...other}
        >
            {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
        </Box>
    )
}
