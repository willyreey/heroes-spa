import { useState } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const LoginPages = () => {

  const {login} = useContext(AuthContext)

  const navigate = useNavigate()

  const [loginName, setLoginName] = useState('')

  const handleInputChange = ({target}) => {
    setLoginName(target.value)
  }

  const onLogin = (e) =>{
    e.preventDefault()

    const lastPath = localStorage.getItem('lastPath') || '/' 
    
    login(loginName)
    navigate(lastPath,{
      replace: true
    })
  }

  return (
    <div className="container mt-5 main">
      
      <h1 className="sign" align="center">App Super Hero</h1>
      <hr />
      <div className="row">
        <form onSubmit={onLogin} className="form1">
            <input className="form-control mx-auto un" type="text" placeholder="Ingrese su Nombre" value={loginName} onChange={handleInputChange} required/>
            <button 
              className="submit mt-4"
            >
              Entrar
            </button>
        </form>
      </div>
    </div>
  )
}
