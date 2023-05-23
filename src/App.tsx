import { useState } from 'react'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import FullWidthLayout from './components/layout/full-width-layout/FullWidthLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full" />
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
