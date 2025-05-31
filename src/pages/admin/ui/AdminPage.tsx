import { Box, Tab, Tabs, Typography } from '@mui/material'
import blue_log from '@/assets/blue_logo.svg'
import support from '@/assets/Support.png'
import logout_icon from '@/assets/logout.svg'
import all from '@/assets/all-menu.svg'
import cashBox from '@/assets/cashbox-menu.svg'
import emloyee from '@/assets/emloyee.svg'
import product from '@/assets/products-menu.svg'

import { COLORS } from '@/shared/style/colors'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/store/authSlice'
import { useActiveTab } from '@/pages/main/hooks/useActiveTab'
import { Companies } from '@/widgets/companies/ui/Companies'
import { CashBoxesAdmin } from '@/widgets/cash_boxes_admin/ui/CashBoxesAdmin'
import { UsersAdmin } from '@/widgets/users_admin'
import { ProductsAdmin } from '@/widgets/products_admin'

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
        component: <ProductsAdmin />,
    },
    {
        name: 'Users',
        icon: emloyee,
        component: <UsersAdmin />,
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
                flexDirection: { xs: 'column', md: 'row' },
                backgroundColor: COLORS.lightBlue,
                width: '100%',
                minHeight: '100vh',
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    backgroundColor: COLORS.white,
                    borderRadius: { md: '24px', xs: 0 },
                    padding: '20px',
                    margin: { xs: 0, md: '15px' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: { xs: 'auto', md: '96vh' },
                    width: { xs: '100%', md: '260px' },
                    position: { md: 'fixed', xs: 'relative' },
                    zIndex: 10,
                    boxShadow: { xs: '0px 2px 6px rgba(0, 0, 0, 0.05)', md: 'none' },
                }}
            >
                {/* Верхняя часть - лого и табы */}
                <Box sx={{ width: '100%', overflowY: 'auto', flexGrow: 1 }}>
                    {/* Логотип */}
                    <Box
                        sx={{
                            marginBottom: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <img
                            src={blue_log}
                            alt="logo"
                            style={{ maxHeight: '36px', width: 'auto' }}
                        />
                        <Typography variant="h6" fontSize="18px">
                            Admin panel
                        </Typography>
                    </Box>

                    {/* Навигация по табам */}
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        orientation={window.innerWidth < 960 ? 'horizontal' : 'vertical'}
                        variant="scrollable"
                        scrollButtons={false}
                        allowScrollButtonsMobile
                        sx={{
                            '& .MuiTab-root': {
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                minHeight: '48px',
                                padding: '8px 12px',
                                gap: '10px',
                                fontSize: '14px',
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.name}
                                icon={
                                    <img
                                        src={tab.icon}
                                        alt={tab.name}
                                        style={{
                                            height: '20px',
                                            width: '20px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                }
                                iconPosition="start"
                                sx={{
                                    width: { xs: '100%', md: '240px' },
                                    marginLeft: { md: '-10px' },
                                    textTransform: 'none',
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Нижняя часть - поддержка и выход */}
                <Box sx={{ width: '100%', mt: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <img
                            src={support}
                            alt="Support"
                            style={{ maxWidth: '140px', height: 'auto' }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        <img src={logout_icon} alt="Logout" />
                        <Link
                            to="#"
                            onClick={handleLogout}
                            style={{
                                textDecoration: 'none',
                                color: COLORS.gray,
                                fontWeight: 600,
                                fontSize: '14px',
                            }}
                        >
                            <Typography variant="inherit">Logout</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: { md: '220px' },
                    width: '100%',
                    paddingTop: { xs: '20px', md: 0 },
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
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '20px',
            }}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    )
}
