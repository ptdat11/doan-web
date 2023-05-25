import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import FullWidthLayout from './components/layout/full-width-layout/FullWidthLayout';
import HomePage from './routes/home/HomePage';
import AboutPage from './routes/about/AboutPage';
import LocalStorage from './submodules/local-storage/local-storage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full" />,
    children: [
      {
        path: "/",
        element: <HomePage id="home" />
      },
      {
        path: "/about",
        element: <AboutPage id="about" />
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
