import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Directory from './pages/Directory'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <div /> },
      { path: 'directory', element: <Directory /> },
      { path: 'map', element: <div /> },
      { path: 'matcher', element: <div /> },
    ],
  },
])
