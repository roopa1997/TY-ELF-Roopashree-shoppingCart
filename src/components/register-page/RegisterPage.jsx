import React, { useState } from 'react'
import Axios from 'axios'
export default function RegisterPage(props) {
    const user = {
        name: '',
        phone: '',
        email: '',
        password: '',
        role: '',
        gender: ''
    }
    const [userData, setUserData] = useState(user)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('state data', userData)
        sendDataToDb()
    }
    const sendDataToDb = async () => {
        const url = 'https://shoppingcart-e3779.firebaseio.com/users.json';
        const copyOfUserData = userData
        console.log('data to send', copyOfUserData)
        try {
            const response = await Axios.post(url, copyOfUserData)
            console.log('success', response)
            if (response.status === 200) {
            setUserData({
                name: '',
                phone: '',
                email: '',
                password: '',
                role: '',
                gender:''
            } )
                props.history.push('/login')
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleChange=(e)=>{
        setUserData(
            {
                ...userData,
                [e.target.name]:e.target.value
            }
        )
    }
    return (
        <>
            <div>
                <div class=" card col-md-4 offset-4 mt-5 ">
                    <form class="form " onSubmit={handleSubmit} >
                        <legend class="h1 card-header">Register Here</legend>
                        <div class="form-group">
                            <label htmlFor="">Name</label>
                            <input type="text"
                                name="name"
                                class="form-control"
                                placeholder="enter name"
                                value={userData.name}
                                onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="">phone Number</label>
                            <input type="text"
                                name="phone"
                                class="form-control"
                                placeholder="enter phone"
                                value={userData.phone}
                                onChange={handleChange} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text"
                                name="email"
                                class="form-control"
                                placeholder="enter email"
                                value={userData.email}
                                onChange={handleChange} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="">password</label>
                            <input type="password"
                                name="password"
                                class="form-control"
                                placeholder="enter password"
                                value={userData.password}
                                onChange={handleChange} />
                        </div>
                        <div class='form-group'>
                            <label htmlFor="role">Select Role</label>
                            <select
                                name="role"
                                class="custom-select"
                                onChange={handleChange}>

                                <option selected>choose..</option>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <input
                                id="female"
                                value="female"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                            />female
                            <input
                                id="male"
                                value="male"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                            />male
                        </div>
                        <button class="btn mt-3 mb-2"
                            type="submit"
                            class="btn btn-primary offset-5 ">
                            Register
                         </button>
                    </form>
                </div>
            </div>
        </>
    )
}
