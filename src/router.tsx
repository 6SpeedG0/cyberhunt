import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Directory from './pages/Directory'
import MapPage from './pages/MapPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <div /> },
      { path: 'directory', element: <Directory /> },
      { path: 'map', element: <MapPage /> },
      { path: 'matcher', element: <div /> },
    ],
  },
])
