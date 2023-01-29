import { Form, LoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router-dom'
import { getThingAsync, updateThing } from '../mockdata/localDataStore'

export async function loader({ params }: LoaderFunctionArgs): Promise<ThingDescription | null> {
  if (!params.thingId) {
    throw new Response('', {
      status: 400,
      statusText: 'An error has occurred',
    })
  }

  const thing = await getThingAsync(params.thingId)
  if (!thing) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return thing
}

export async function action({ request, params }: LoaderFunctionArgs) {
  let formData = await request.formData()
  return updateThing(params.thingId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export default function Thing() {
  const thing = useLoaderData() as ThingDescription | null
  if (!thing) throw new Error()

  return (
    <div id="thing">
      {thing.thumbnail && (
        <div>
          <img key={thing.thumbnail} src={thing.thumbnail} />
        </div>
      )}

      <div>
        <h1>
          {thing.name ? <>{thing.name}</> : <i>No Name</i>} <Favorite {...thing} />
        </h1>

        {thing.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${thing.twitter}`}>
              {thing.twitter}
            </a>
          </p>
        )}

        {thing.notes && <p>{thing.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite(thing: ThingDescription) {
  const fetcher = useFetcher()
  let favorite = thing.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
