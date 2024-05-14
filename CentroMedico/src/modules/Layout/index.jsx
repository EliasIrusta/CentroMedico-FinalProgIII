import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,

  UserOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  ScheduleTwoTone,
  CloseSquareOutlined,
  DollarOutlined
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
  getItem(<Link to="/"> Home </Link>, '1', <HomeOutlined />),

  getItem(<Link to="/usuarios/create"> Crear Usuarios </Link>, '2', <UserOutlined />),

  getItem(<Link to="/medicos"> Medicos </Link>, '5', <MedicineBoxOutlined />, [
    getItem(<Link to="/usuarios/list"> Listar Medicos</Link>, '4', <UserOutlined />),
  ]),

  getItem(<Link to="/pacientes"> Pacientes </Link>, '6', <MedicineBoxOutlined />, [
    getItem(<Link to="/pacientes/list"> Listar Pacientes</Link>, '7', <UserOutlined />),

  ]),

  getItem(<Link to="/turnos"> Turnos </Link>, '8', <ScheduleOutlined />, [

    getItem(<Link to="/turnos/Buscar"> Buscar Turnos</Link>, '11', <ScheduleTwoTone />),
    ,
    getItem(<Link to="/turnos/Modificar"> Modificar Turno</Link>, '10', <ScheduleTwoTone />),
    ,

  
  ]),
  getItem(
    <Link to="/Cobros"> Cobros </Link>,'15', <DollarOutlined />
  ),

  getItem(
    <Link to="/Login/Logout"> Logout </Link>,
    '9',
    <CloseSquareOutlined />
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
      <Layout style={{ width: '100%' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>SECRETARÍA</h1>
        </Header>
        <Content
          style={{
            margin: '20px 16px',
          }}
        >
          <div
            style={{
              height: '100%',
              background: colorBgContainer,
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
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
