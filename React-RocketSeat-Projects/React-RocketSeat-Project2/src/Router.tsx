import React from 'react'
import { Route, Routes  } from 'react-router-dom' //importar do 'react-router-dom'
import Home from './pages/Home/index'
import History from './pages/History/index'
import DefaultLayout from './layouts/DefaultLayout'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>

        <Route path='/' element={<Home/>} /> 
        <Route path='/history' element={<History/>} /> 

      </Route>
    </Routes>
  )
}

//<Route path='/' />  o /, serve para indicar que o caminho vai ser a página principal, a home no caso
//para cada página temos uma rota
// colocamos dentro do element o componente que devemos acessar, que no caso é o co´mponent Home


export default Router