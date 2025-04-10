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
    {
        name: 'Analytics',
        icon: analytics,
        component: <All />,
    },
]

export const AdminPage = () => {
    const { activeTab, handleTabChange } = useActiveTab(routeToTab)
    const navigate = useNavigate()
<<<<<<< HEAD

=======
>>>>>>> master
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
<<<<<<< HEAD
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
=======
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
>>>>>>> master
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
<<<<<<< HEAD
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
=======
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
>>>>>>> master
                        sx={{
                            '& .MuiTab-root': {
                                justifyContent: 'flex-start',
                                textAlign: 'left',
<<<<<<< HEAD
=======
                                minHeight: '48px',
                                padding: '8px 12px',
                                gap: '10px',
                                fontSize: '14px',
>>>>>>> master
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.name}
<<<<<<< HEAD
                                icon={<img src={tab.icon} alt={tab.name} />}
                                iconPosition="start"
                                sx={{
                                    marginLeft: '-10px',
                                    width: '240px',
=======
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
>>>>>>> master
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
<<<<<<< HEAD
                <Box>
                    <img src={support} alt="Support" />
=======

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

>>>>>>> master
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
<<<<<<< HEAD
                            marginTop: '30px',
=======
>>>>>>> master
                        }}
                    >
                        <img src={logout_icon} alt="Logout" />
                        <Link
                            to="#"
<<<<<<< HEAD
=======
                            onClick={handleLogout}
>>>>>>> master
                            style={{
                                textDecoration: 'none',
                                color: COLORS.gray,
                                fontWeight: 600,
<<<<<<< HEAD
                            }}
                            onClick={handleLogout}
=======
                                fontSize: '14px',
                            }}
>>>>>>> master
                        >
                            <Typography variant="inherit">Logout</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
<<<<<<< HEAD
            <Box
                sx={{
                    flex: 14,
=======

            {/* Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: { md: '220px' },
                    width: '100%',
                    paddingTop: { xs: '20px', md: 0 },
>>>>>>> master
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
<<<<<<< HEAD
                width: '1440px',
                margin: '0 auto',
            }}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
=======
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '20px',
            }}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
>>>>>>> master
        </Box>
    )
}
