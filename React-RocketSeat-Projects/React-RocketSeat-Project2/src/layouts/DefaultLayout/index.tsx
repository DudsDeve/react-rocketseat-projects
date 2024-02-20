import React from 'react'
import Header from '../../Components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'

const DefaultLayout = () => {
  return (
    <>
    <LayoutContainer>
        <Header/>
        <Outlet/>
    </LayoutContainer>
    </>
  )
}
//quando usamos o Outlet, quer dizer que iremos mostrar para o React onde queremos que fique posicionado o conteúdo 
export default DefaultLayout