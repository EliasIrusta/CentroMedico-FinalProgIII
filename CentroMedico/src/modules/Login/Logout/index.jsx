import { Button } from 'antd'

import { useLocation} from 'react-router-dom'

function Logout() {
  const location = useLocation()

  console.log(location)

  const salir = () => {
    localStorage.clear()
    window.location.href = "/";
    window.location.reload()
  }

  return (
    <div>
      <Button type="primary" onClick={() => salir()}>
        Salir del sistema
      </Button>
    </div>
  )
}

export default Logout
