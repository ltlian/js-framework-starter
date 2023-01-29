import { Brightness3, Brightness7 } from '@mui/icons-material'
import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from './redux/themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: { theme: { darkTheme: boolean } }) => state.theme)

  return (
    <Grid container justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={theme.darkTheme} onChange={() => dispatch(toggleTheme())} />}
          label={
            theme.darkTheme ? <Brightness3 color="primary" /> : <Brightness7 color="primary" />
          }
        />
      </FormGroup>
    </Grid>
  )
}
