import { useState } from 'react'
import { useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import './App.css'
import { darkTheme, lightTheme } from './themes'
import {
  ThemeProvider,
  Card,
  Typography,
  CssBaseline,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from '@mui/material'
import ThemeToggle from './ThemeToggle'

function App() {
  const [count, setCount] = useState(0)
  const theme = useSelector((state: { theme: { darkTheme: boolean } }) => state.theme)

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Card>
          <CardMedia>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </CardMedia>
          <CardContent>
            <Typography variant="h1" color="primary">
              Vite + React
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </Button>
          </CardContent>
          <CardActions>
            <ThemeToggle />
          </CardActions>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App
