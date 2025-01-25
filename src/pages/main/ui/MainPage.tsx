import { Box, Tab, Tabs, Typography } from '@mui/material'
import blue_log from '@/assets/blue_logo.svg'
import support from '@/assets/Support.png'
import logout from '@/assets/logout.svg'
import all from '@/assets/all-menu.svg'
import cashBox from '@/assets/cashbox-menu.svg'
import emloyee from '@/assets/emloyee.svg'
import product from '@/assets/products-menu.svg'
import analytics from '@/assets/analytics-menu.svg'
import { useState } from 'react'
import { COLORS } from '@/shared/style/colors'
import { Link } from 'react-router-dom'
import { All } from '@/widgets/all'

export const MainPage = () => {
    const [tab, setTab] = useState(0)

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: COLORS.lightBlue,
                width: '100%',
                height: '100vh',
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
                        value={tab}
                        onChange={handleChangeTab}
                        orientation="vertical"
                        sx={{
                            textTransform: 'none',
                            '& .MuiTab-root': {
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                            },
                            '& .MuiTab-wrapper': {
                                flexDirection: 'row',
                                gap: '8px',
                            },
                        }}
                    >
                        <Tab label="All" icon={<img src={all} alt="All" />} iconPosition="start" />
                        <Tab
                            label="Cash Boxes"
                            icon={<img src={cashBox} alt="Cash Boxes" />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Products"
                            icon={<img src={product} alt="Products" />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Employees"
                            icon={<img src={emloyee} alt="Employees" />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Analytics"
                            icon={<img src={analytics} alt="Analytics" />}
                            iconPosition="start"
                        />
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
                    overflowY: 'auto',
                }}
            >
                <CustomTabPanel value={tab} index={0}>
                    <All />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={3}>
                    Item Four
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={4}>
                    Item Five
                </CustomTabPanel>
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
