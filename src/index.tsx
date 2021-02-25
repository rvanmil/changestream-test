import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { enableMapSet } from 'immer' // Keep this dependency in sync with the Immer version used by @reduxjs/toolkit
import store from './redux/index'
import App from './components/App/App'
import { initTodosWatch } from './realm/streams/todo'

const initialize = () => {
	// Initialize Immer (used by Redux)
	enableMapSet()

	// MUI Theme
	const theme = createMuiTheme({
		palette: { primary: blue },
		typography: { fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(',') }
	})

	// Initialize streams
	initTodosWatch(store)

	// React Render
	ReactDOM.render(
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseline />
					<App />
				</BrowserRouter>
			</MuiThemeProvider>
		</Provider>,
		document.getElementById('app')
	)
}

initialize()
