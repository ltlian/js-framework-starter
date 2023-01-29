import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { deleteThing } from '../mockdata/localDataStore'

export async function action({ params }: ActionFunctionArgs) {
  await deleteThing(params.thingId)
  return redirect('/')
}
