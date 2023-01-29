import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import './index.css'
import store from './redux/store'
import { action as destroyAction } from './routes/destroy'
import EditThing, { action as editAction } from './routes/edit'
import Index from './routes/index'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import Thing, { action as thingAction, loader as thingLoader } from './routes/thing'

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
