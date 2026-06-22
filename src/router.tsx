import { createBrowserRouter } from 'react-router-dom'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <div /> },
      { path: 'directory', element: <div /> },
      { path: 'map', element: <div /> },
      { path: 'matcher', element: <div /> },
    ],
  },
])
