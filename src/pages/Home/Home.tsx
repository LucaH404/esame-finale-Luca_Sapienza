import React from 'react'
import './Home.css'
import { ConfigProvider } from 'antd'
const Home = () => {
  return (
    <ConfigProvider
    theme={{
        components: {},
        token: {}
    }}    
    >
        <footer className='footer-wrapper'>
            <p>Creato da: Luca Sapienza</p>
        </footer>
    </ConfigProvider>
  )
}

export default Home