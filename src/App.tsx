import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { ROUTES, RoutesType } from './routes'


function App(): React.ReactNode {

  return (
    <>
      <Routes>
        {ROUTES.map((route: RoutesType, index: number) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
      
    </>
  )
}

export default App
