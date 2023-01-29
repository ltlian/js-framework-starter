import {
  Form,
  Link,
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import { createThingAsync, getThingsAsync } from '../mockdata/localDataStore'

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

export default function Root() {
  const { things, q } = useLoaderData() as { things: ThingDescription[]; q: string | null }
  const navigation = useNavigation()
  const submit = useSubmit()

  if (things === null) {
    throw new Error('Cache error')
  }

  const searching =
    typeof navigation.location !== 'undefined' &&
    new URLSearchParams(navigation.location.search).has('q')

  return (
    <>
      <div id="sidebar">
        <h1>React Router Things</h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search things"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q ?? ''}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
        </div>
        <nav>
          {things?.length ? (
            <ul>
              {things.map((thing) => (
                <li key={thing.id}>
                  <NavLink
                    to={`things/${thing.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {thing.name ? <>{thing.name}</> : <i>No Name</i>}{' '}
                    {thing.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No things</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}
