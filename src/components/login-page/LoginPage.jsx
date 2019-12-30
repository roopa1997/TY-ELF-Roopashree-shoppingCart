import React, { useState } from 'react'
import Axios from 'axios'

export default function LoginPage(props) {
    const userLogin = {
        email: '',
        password: ''
    }
    const [login, setLogin] = useState(userLogin)
    const [serverData, setServerData] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'https://shoppingcart-e3779.firebaseio.com/users.json'
        await Axios.get(url)
            .then((response) => {
                let fetchedAccount = []
                for (let key in response.data) {
                    let account = response.data[key]
                    fetchedAccount.push({
                        ...account,
                        id: key
                    })
                    // setServerData(fetchedAccount)
                }
                setServerData({
                    serverData: fetchedAccount
                })
            })
        checkUser()
    }
    const checkUser = () => {
        console.log('now in state', serverData)
        let searchArray = []
        searchArray = [...this.state.serverData]
        let u = [];
        let p = [];
        for (let key in searchArray) {
            let userEmail = searchArray[key].email
            let pwd = searchArray[key].password
            u.push(userEmail)
            p.push(pwd)

        }
        console.log('uname', u)
        let unameFound = u.indexOf(login.email)
        let pwdFound = p.indexOf(login.password)
        if (unameFound !== -1 && pwdFound !== -1) {
            console.log('valid user')
            /*  this.enroute() */

        } else {
            /*   alert('invaid username or password please do register !') */
           /*  this.enrouteToRegister() */
           console.log('invalid user')
        }
    }
    return (
        <>
            <div class=" card col-md-4 offset-4 mt-5 ">
                <form class="form " onSubmit={handleSubmit} >
                    <legend class="h1 card-header">Login Form</legend>
                    <div class="form-group">
                        <label htmlFor="">User Name</label>
                        <input type="text"
                            name="userName"
                            class="form-control"
                            placeholder="enter username"
                            value={login.email}
                            onChange={(e) => setLogin({
                                ...login,
                                email: e.target.value
                            })} />

                    </div>
                    <div class="form-group">
                        <label htmlFor="">password</label>
                        <input type="password"
                            name="password"
                            class="form-control"
                            placeholder="enter password"
                            value={login.password}
                            onChange={(e) => setLogin({
                                ...login,
                                password: e.target.value
                            })} />

                    </div>
                    <button class="btn mt-3 mb-2"
                        type="submit"
                        class="btn btn-primary offset-5 ">
                        login
                         </button>

                </form>
            </div>

        </>
    )
}
