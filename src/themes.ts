import { createTheme } from '@mui/material'
import { amber, deepOrange, lime } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: deepOrange,
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
