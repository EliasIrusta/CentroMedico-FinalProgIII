import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Logout() {

  const salir = () => {
    localStorage.clear()
    window.location.href = '/'
    window.location.reload
  }

  return (
    <div>
      <Button type="primary" onClick={salir}>
        Salir del sistema
      </Button>
    </div>
  )
}

export default Logout
