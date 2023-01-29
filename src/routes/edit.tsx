import { Button, Stack, TextField } from '@mui/material'
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
      <Stack
        sx={{
          width: '25ch',
        }}
        spacing={2}
      >
        <TextField
          name="name"
          placeholder="Name"
          aria-label="Name"
          helperText="Name"
          defaultValue={thing.name}
        />
        <TextField
          name="twitter"
          placeholder="@handle"
          aria-label="twitter"
          helperText="twitter"
          defaultValue={thing.twitter}
        />
        <TextField
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          helperText="Avatar URL"
          defaultValue={thing.thumbnail}
        />
        <TextField label="notes" multiline defaultValue={thing.notes} rows={6} />
      </Stack>
      <p>
        <Button color="primary" type="submit">
          Save
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </Button>
      </p>
    </Form>
  )
}
