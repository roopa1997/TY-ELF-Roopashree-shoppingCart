import React, { Component } from 'react'
import Axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super(props)
        console.log('in login class', this)
    }
    state = {
        data: [],
        email: '',
        password: ''
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state
        console.log(email)
        const url = 'https://shoppingcart-e3779.firebaseio.com/users.json'
        Axios.get(url).then((response) => {
            console.log('response', response)
            let fetchedData = []
            for (let key in response.data) {
                let account = response.data[key]
                console.log(fetchedData)
                fetchedData.push({
                    ...account,
                    id: key
                })
                // console.log('fetchdata', fetchedData)
                this.setState({
                    data: fetchedData
                })
                console.log('data to be searched', this.state.data)
                let searchArray = []
                searchArray = [...this.state.data]
                let u = [];
                let p = [];

                for (let key in searchArray) {
                    let uname = searchArray[key].email
                    let pwd = searchArray[key].password
                    u.push(uname)
                    p.push(pwd)


                }
                let unameFound = u.indexOf(this.state.email)
                let pwdFound = p.indexOf(this.state.password)

                if (unameFound !== -1 && pwdFound !== -1) {
                    this.enroute()
                } else {
                    this.enrouteToRegister()

                }
            }
        }).catch((error) => {
            // console.log('error', error)
        })
    }
    enroute = () => {
        this.props.history.push('/showProducts')
        console.log('valid user')
    }
    enrouteToRegister = () => {
        console.log('invalid')
        this.props.history.push('/CreateAccount')
    }
    render() {
        return (
            <>
                <div class=" card col-md-4 offset-4 mt-5 ">
                    <form class="form " onSubmit={this.handleSubmit} >
                        <legend class="h1 card-header">Login Form</legend>
                        <div class="form-group">
                            <label htmlFor="">User Name</label>
                            <input type="text"
                                name="email"
                                class="form-control"
                                placeholder="enter email"
                                value={this.state.email}
                                onChange={this.handleChange} />

                        </div>
                        <div class="form-group">
                            <label htmlFor="">password</label>
                            <input type="password"
                                name="password"
                                class="form-control"
                                placeholder="enter password"
                                value={this.state.password}
                                onChange={this.handleChange} />

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
}