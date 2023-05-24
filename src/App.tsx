import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import FullWidthLayout from './components/layout/full-width-layout/FullWidthLayout';
import HomePage from './routes/home/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full" />,
    children: [
      {
        path: "/",
        element: <HomePage id="home" />
      }
    ]
  }
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
