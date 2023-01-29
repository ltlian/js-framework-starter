import { ActionFunctionArgs, Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { updateThing } from '../mockdata/localDataStore'

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateThing(params.thingId, updates)
  return redirect(`/things/${params.thingId}`)
}

export default function EditThing() {
  const thing = useLoaderData() as ThingDescription
  const navigate = useNavigate()

  return (
    <Form method="post" id="thing-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={thing.name}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@handle" defaultValue={thing.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={thing.thumbnail}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={thing.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  )
}
