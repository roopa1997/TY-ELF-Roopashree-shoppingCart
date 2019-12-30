import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function CartPage() {
    const [productData, setProductData] = useState([]);
    const [qntity, setQntity] = useState(null);
    const handleSubmit = async () => {
        const url = 'https://shoppingcart-e3779.firebaseio.com/cart.json'
        const response = await Axios.get(url)
        console.log('response', response)
        let fetchedData = []
        for (let key in response.data) {
            let account = response.data[key]
            console.log('fetchedData', account)
            fetchedData.push({
                ...account,
                id: key
            })

            setProductData(fetchedData)
            console.log('data in state', productData)
        }
    }
    const deleteAccount = async (accToDelete) => {
        console.log('account to be deleted', accToDelete)
        const id = accToDelete.id
        const url = 'https://shoppingcart-e3779.firebaseio.com/cart/' + id + '.json'
        try {
            const response = await Axios.delete(url)
            console.log('deleted', response)
            const myAccount = [...productData]
            const index = myAccount.indexOf(accToDelete)
            myAccount.splice(index, 1)
            console.log('remaining accounts', myAccount)
            setProductData(
                myAccount
            )
            //this.getAllAccounts is a bad practice because it make a call to the backen every time !!
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleChange = (e) => {
        setQntity(e.target.value)
    }
    const handleDropdownSubmit = (val) => {
        console.log("val in select dropdown",val)
        
        productData.map((v, k) => {
            if(val.id===v.id){
                console.log('price',val.price)
               /*  v.price=qntity*val.price */
                const result = qntity*val.price
                console.log('changed price',result)
            }
            else{
                
            }
        })
    }
    useEffect(() => {
        console.log('calling function')
        handleSubmit()
    }, [])
    useEffect(() => {
console.log('to check qntity',qntity)
    }, [productData,qntity])
    return (
        <>
            <div>
                {productData.map((val, key) => {
                    return (
                        <div className="card col-md-2 mt-2 mb-2 ml-2 float-left p-2" style={{ height: '350px' }}>
                            <img src={val.image} style={{ width: '100px' }, { height: '200px' }}></img>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>{val.brand}</h4>
                                </div>
                                <div className="col-md-6">
                                    <h5>{val.price}/-</h5>
                                </div>
                            </div>
                            <form class="form " onSubmit={handleDropdownSubmit(val)} >
                                <div class='form-group'>
                                    <select
                                        name="qntity"
                                        class="custom-select"
                                        onChange={handleChange}>
                                        <option selected>choose quantity</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </form>
                            <button className="btn btn-danger" onClick={() => { deleteAccount(val) }} >Remove<i class="fa fa-times" aria-hidden="true"></i></button>

                        </div>
                    )
                })}

            </div>


        </>
    )
}
