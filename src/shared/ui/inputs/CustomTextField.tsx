import { TextField, TextFieldProps } from '@mui/material'

export const CustomTextField = (props: TextFieldProps) => {
    return (
        <TextField
            {...props}
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Border radius for input
                },
                '& .MuiInputLabel-root': {
                    fontSize: '14px', // Adjust label font size
                },
                '& .MuiInputLabel-shrink': {
                    transform: 'translate(0, -1.5rem) scale(1)', // Label stays shrunk
                },
                marginBottom: '20px', // Add margin bottom
            }}
        />
    )
}

export default CustomTextField
