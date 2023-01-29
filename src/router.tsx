import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error-page'
import { action as destroyAction } from './routes/destroy'
import EditThing, { action as editAction } from './routes/edit'
import Index from './routes/index'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import Thing, { action as thingAction, loader as thingLoader } from './routes/thing'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'things/:thingId',
            element: <Thing />,
            loader: thingLoader,
            action: thingAction,
          },
        ],
      },
      { index: true, element: <Index /> },
      {
        path: 'things/:thingId',
        element: <Thing />,
        loader: thingLoader,
        action: thingAction,
      },
      {
        path: 'things/:thingId/edit',
        element: <EditThing />,
        loader: thingLoader,
        action: editAction,
      },
      {
        path: 'things/:thingId/destroy',
        action: destroyAction,
      },
    ],
  },
])
