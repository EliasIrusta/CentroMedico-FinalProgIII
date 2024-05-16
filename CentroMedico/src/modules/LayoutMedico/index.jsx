import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  HistoryOutlined,
  FileDoneOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem(
    <Link to="Medico/Historial"> Historial </Link>,
    '1',
    <HistoryOutlined />,
  ),
  getItem(<Link to="Medico/Agenda"> Agenda </Link>, '2', <FileDoneOutlined />),
  getItem(
    <Link to="Login/Logout"> Logout </Link>,
    '4',
    <CloseSquareOutlined />,
  ),
]

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout style={{ width: '100%' }} className="section-background">
        <Header
          style={{
            padding: 0,
            background: 'var(--color-bg-container)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Medico</h1>
        </Header>
        <Content
          style={{
            margin: '20px 16px',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: 'var(--color-bg-container)',
          }}
        >
          Centro Médico - Final de Programación III - 2024
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
