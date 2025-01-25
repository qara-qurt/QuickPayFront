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
                padding: '20px 40px',
            }}
            onClick={() => navigate(`#`)}
        >
            <img
                src={employeeImage}
                style={{
                    margin: '15px 0',
                }}
            />
            <Typography variant="h6">
                {employee.surname} {employee.name}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '16px',
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
                }}
            >
                username: qaraqurt
            </Typography>
        </Box>
    )
}
