import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import logo from '@/assets/logo.svg'
import { RegisterForm } from '@/features/auth'

export const SignUpPage = () => {
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
                sx={{ paddingBottom: 40 }}
            >
                <Box
                    width={'100%'}
                    maxWidth={'260px'}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                >
                    <Box display={'flex'} alignItems="end" mb={2}>
                        <img src={logo} alt="logo" style={{ marginRight: 10 }} />
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h4">Get started</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Tell about yourself</Typography>
                        <Typography variant="h5">And start work in our platform</Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                flex={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5" mb={3}>
                    Tell about yourself
                </Typography>
                <RegisterForm />
            </Box>
        </Box>
    )
}
