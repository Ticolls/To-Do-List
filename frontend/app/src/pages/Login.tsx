import { api } from '../services/api'
import { FormEvent, useState } from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'

export function Login() {

    const [userNeedToBeCreated, setUserNeedToBeCreated] = useState(false)
    const [userName, setUserName] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [confirmPassword, setConfirmPassword] = useState<string | null>("")

    const navigate = useNavigate()

    function triggerUserNeedToBeCreated() {
        setUserNeedToBeCreated(!userNeedToBeCreated)
    }

    function getUser(event: FormEvent<HTMLInputElement>) {
        setUserName(event.currentTarget.value)
    }

    function getPassword(event: FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    function getConfirmPassword(event: FormEvent<HTMLInputElement>) {
        setConfirmPassword(event.currentTarget.value)
    }

    async function handleSubmitCreateUser() {

        if (userName && password && confirmPassword && password == confirmPassword) {
            const res = await api.post("/users/create", {
                userName: userName,
                password: password
            })

            if (res.data.userExists) {
                console.log("user already exists")
                return
            } else {
                navigate("home/" + userName)
            }

        } else {
            console.log("senha Incorreta!")
        }
    }

    async function handleSubmitLoginUser() {

        if (userName && password) {
            const res = await api.post("/users/login", {
                userName: userName,
                password: password
            })

            if (res.data.userExists) {
                navigate("home/" + userName)
            } else {
                console.log("usuário ou senha incorreta!")
            }

        } else {
            console.log("digite algo!")
        }
    }


    return (
        <div className='login-page'>
            <header>
                <h1>TO-DO-LIST</h1>
                <div id="symbol"></div>
            </header>
            <div id="container">
                <form action="#" id="login-form">
                    <div id='fields'>
                        <div id='user-container' className='field'>
                            <label htmlFor="user">Usuário</label>
                            <input type="text" name="user" onChange={getUser} />
                        </div>

                        <div id='password-container' className='field'>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                name="password"
                                onChange={getPassword}
                            />
                        </div>

                        {userNeedToBeCreated ? (<div id='password-confirm-container' className='field'>
                            <label htmlFor="password-confirm">Confirme a senha</label>
                            <input
                                type="password"
                                name="password-confirm"
                                onChange={getConfirmPassword}
                            />
                        </div>) : null}
                    </div>

                    <button
                        type="button"
                        id="login-button"
                        onClick={userNeedToBeCreated ? handleSubmitCreateUser : handleSubmitLoginUser}>
                        {userNeedToBeCreated ? "Sign in" : "Login"}
                    </button>

                    {userNeedToBeCreated ? (<p>Já tem uma conta ? Acesse ela <a onClick={triggerUserNeedToBeCreated}>aqui</a></p>) : (<p>Crie sua conta <a onClick={triggerUserNeedToBeCreated}>aqui</a></p>)}

                </form>
            </div>
        </div>

    )
}