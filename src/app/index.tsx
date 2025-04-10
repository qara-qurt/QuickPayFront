import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router/Router'
import { CheckRoute } from './router/CheckRoute'

// THEME
const theme = createTheme({
    typography: {
        fontFamily: 'Nunito Sans, Arial, sans-serif',
        fontSize: 14,
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
                <BrowserRouter>
                    <CheckRoute>
                        <Router />
                    </CheckRoute>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    )
}
