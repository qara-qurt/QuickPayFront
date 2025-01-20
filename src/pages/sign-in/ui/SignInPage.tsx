import { Box, Typography } from '@mui/material'
import logo from '@/assets/logo.svg'
import banner from '@/assets/banner.png'
import { COLORS } from '@/shared/style/colors'
import { LoginForm } from '@/features/auth'

export const SignInPage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            {/* Левая часть */}
            <Box
                flex={1}
                bgcolor={COLORS.blue}
                height={'100vh'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign={'start'}
                color={COLORS.white}
            >
                <Box
                    width={'100%'}
                    maxWidth={'460px'}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                >
                    <Box display={'flex'} alignItems="end" mb={2}>
                        <img src={logo} alt="logo" style={{ marginRight: 10 }} />
                        <Typography variant="h5">QuickPay</Typography>
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h4">
                            Your place to work <br /> Plan, Create, Control
                        </Typography>
                    </Box>
                    <Box>
                        <img src={banner} alt="banner" />
                    </Box>
                </Box>
            </Box>

            {/* Правая часть */}
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                px={7}
            >
                <Typography variant="h5" mb={3}>
                    Sign In to QuickPay
                </Typography>
                <LoginForm />
            </Box>
        </Box>
    )
}
