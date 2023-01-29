import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import { useSelector } from 'react-redux'
import {
  Form,
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import { createThingAsync, getThingsAsync } from '../mockdata/localDataStore'
import { darkTheme, lightTheme } from '../themes'
import ThemeToggle from '../ThemeToggle'

const drawerWidth = 240

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{ things: ThingDescription[]; q: string | null }> {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const things = await getThingsAsync(q)
  return { things, q }
}

export async function action(): Promise<Response> {
  const thing = await createThingAsync()
  return redirect(`/things/${thing.id}/edit`)
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}))

export default function Root() {
  const theme = useSelector((state: { theme: { darkTheme: boolean } }) => state.theme)
  const { things, q } = useLoaderData() as { things: ThingDescription[]; q: string | null }
  const navigation = useNavigation()
  const location = useLocation()
  const submit = useSubmit()

  if (things === null) {
    throw new Error('Cache error')
  }

  const searching =
    typeof navigation.location !== 'undefined' &&
    new URLSearchParams(navigation.location.search).has('q')

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              React Router Things
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <nav>
            <List>
              <ListItem>
                <Form method="post">
                  <Button color="primary" type="submit" variant="contained">
                    New
                  </Button>
                </Form>
                <ThemeToggle />
              </ListItem>
              <ListItem>
                <Form id="search-form" role="search">
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      {searching && (
                        <CircularProgress hidden={true} size={37} sx={{ position: 'absolute' }} />
                      )}
                    </div>
                    <TextField
                      hiddenLabel
                      variant="filled"
                      size="small"
                      sx={{ ml: 9 }}
                      id="q"
                      name="q"
                      aria-label="Search things"
                      placeholder="Search"
                      type="search"
                      defaultValue={q ?? ''}
                      onChange={(event) => {
                        const isFirstSearch = q == null
                        submit(event.currentTarget.form, {
                          replace: !isFirstSearch,
                        })
                      }}
                    />
                  </Box>

                  <div className="sr-only" aria-live="polite"></div>
                </Form>
              </ListItem>
              {things.map((thing, index) => {
                return (
                  <StyledLink key={thing.id} to={`things/${thing.id}`}>
                    <ListItemButton selected={location.pathname.startsWith('/things/' + thing.id)}>
                      <ListItemIcon>
                        {thing.favorite && <FavoriteIcon fontSize="small" color="primary" />}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="button" display="block">
                          {thing.name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </StyledLink>
                )
              })}
            </List>
          </nav>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
