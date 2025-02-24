import cashbox from '@/assets/cashbox.svg'
import { COLORS } from '@/shared/style/colors'
import { Box, Typography } from '@mui/material'
import calendar from '@/assets/products-menu.svg'
import priority from '@/assets/priority.svg'
import { CashBox } from '@/shared/api/cashbox/types'
import { formatDate } from '@/shared/utils/formatDate'

interface ICashBoxCardProps {
    cachBox: CashBox
}

export const CashBoxCard = ({ cachBox }: ICashBoxCardProps) => {
    return (
        <Box
            sx={{
                backgroundColor: COLORS.white,
                borderRadius: '24px',
                display: 'flex',
                gap: '30px',
            }}
        >
            <Box
                sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRight: `1px solid ${COLORS.lightGray}`,
                    paddingRight: '40px',
                    padding: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                    }}
                >
                    <img src={cashbox} alt="cashbox" />
                    <Box>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                            }}
                        >
                            {cachBox.cashbox_id}
                        </Typography>
                        <Typography variant="h6">{cachBox.name}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <img src={calendar} alt="" width={'22px'} />
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                                margin: '10px 5px',
                            }}
                        >
                            {formatDate(cachBox.created_at)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={priority} alt="" width={'18px'} />
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.yellow,
                                marginX: '5px',
                            }}
                        >
                            Medium
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 3,
                    padding: '20px',
                }}
            >
                <Typography variant="h6">Information</Typography>
                <Box sx={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
                    <Box>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                            }}
                        >
                            Today Cash
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {/* {cachBox.information.todayCash}kz */}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                            }}
                        >
                            Total cash
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {/* {cachBox.information.totalCash}kz */}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                            }}
                        >
                            Transacional count today
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {/* {cachBox.information.transactionalToday} */}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: COLORS.gray,
                            }}
                        >
                            Transactional count all time
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {/* {cachBox.information.transactionalTotal} */}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
