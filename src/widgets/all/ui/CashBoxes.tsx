import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '@/assets/arrow.svg'
import { CashBox } from '@/shared/api/cashbox/types'
import { CashBoxCard } from '@/shared/ui'

interface ICashBoxProps {
    cashBoxes: CashBox[]
}

export const CashBoxes: React.FC<ICashBoxProps> = ({ cashBoxes }) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                marginTop: '40px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">Cash Boxes</Typography>
                <Box
                    onClick={() => {
                        navigate('/cash-boxes')
                    }}
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Link
                        to="#"
                        style={{
                            textDecoration: 'none',
                            color: COLORS.blue,
                            fontWeight: 600,
                            fontFamily: 'Nunito Sans, Arial, sans-serif',
                        }}
                    >
                        View all
                    </Link>
                    <img src={arrow} alt="" />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {cashBoxes.length > 0 ? (
                    cashBoxes.map((cashBox, index) => <CashBoxCard key={index} cachBox={cashBox} />)
                ) : (
                    <Typography variant="body1">No cash boxes</Typography>
                )}
            </Box>
        </Box>
    )
}
