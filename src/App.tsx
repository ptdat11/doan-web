import { RecoilRoot } from 'recoil'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'


function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
