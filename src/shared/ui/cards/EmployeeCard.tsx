import { Box, Typography } from '@mui/material'
import employeeImage from '@/assets/employee.png'
import { COLORS } from '@/shared/style/colors'
import { useNavigate } from 'react-router-dom'

interface IEmployeeCardProps {
    employee: {
        name: string
        surname: string
        position: string
    }
}

export const EmployeeCard = ({ employee }: IEmployeeCardProps) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                backgroundColor: COLORS.lightBlue,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 30px',
            }}
            onClick={() => navigate(`#`)}
        >
            <img
                src={employeeImage}
                style={{
                    margin: '15px 0',
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    fontSize: '18px',
                }}
            >
                {employee.surname} {employee.name}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    marginTop: '-8px',
                    border: `1.5px solid ${COLORS.gray}`,
                    borderRadius: '8px',
                    padding: '3px 5px 0 5px',
                    margin: '3px 0',
                    color: COLORS.gray,
                }}
            >
                {employee.position}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                }}
            >
                login: qaraqurt
            </Typography>
        </Box>
    )
}
