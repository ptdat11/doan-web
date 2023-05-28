import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import FullWidthLayout from './components/layout/full-width-layout/FullWidthLayout';
import HomePage from './routes/home/HomePage';
import AboutPage from './routes/about/AboutPage';
import ErrorPage from './routes/error/ErrorPage';
import UserPage from './routes/user/UserPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full" />,
    errorElement: <ErrorPage id="error" />,
    children: [
      {
        path: "/",
        element: <HomePage id="home" />,
      },
      {
        path: "/about",
        element: <AboutPage id="about" />
      },
      {
        path: "/user",
        element: <UserPage id="user" />
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
