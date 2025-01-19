import { COLORS } from '@/shared/style/colors'
import { Typography } from '@mui/material'

export const ErrorSpan = ({ error }: { error: string }) => {
    return (
        <Typography
            variant="inherit"
            color={COLORS.white}
            align={'left'}
            sx={{
                fontWeight: 700,
                fontSize: 14,
                width: '100%',
                backgroundColor: COLORS.red,
                borderRadius: 2,
                py: 1,
                px: 2,
            }}
        >
            {error}
        </Typography>
    )
}
