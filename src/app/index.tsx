import { Provider } from 'react-redux'
import { router } from './router'
import { createTheme, ThemeProvider } from '@mui/material'
import { store } from './store'
import { RouterProvider } from 'react-router-dom'

// THEME
const theme = createTheme({
    typography: {
        fontFamily: 'Nunito Sans, Arial, sans-serif',
        h1: {
            fontWeight: 'bold',
        },
        h2: {
            fontWeight: 'bold',
        },
        h3: {
            fontWeight: 'bold',
        },
        h4: {
            fontWeight: 'bold',
        },
        h5: {
            fontWeight: 'bold',
        },
        h6: {
            fontWeight: 'bold',
        },
    },
})

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    )
}
