import React, { useState, useEffect } from 'react'
import Axios from 'axios'
export default function ShowProductsPage() {
    const [productData, setProductData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [wishlistClicked, setWishListClicked] = useState(false)
    let w1, w2;
    const handleChange = event => {
        setSearchTerm(event.target.value);
        console.log(event.target.value)
        console.log('data in state', productData)

    };

    const handleSubmit = async () => {
        const url = 'https://shoppingcart-e3779.firebaseio.com/products.json'
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
    const addAccount = async (accToAdd) => {
        console.log('account to be deleted', accToAdd)
        sendDataToDb(accToAdd)
    }
    const sendDataToDb = async (accToAdd) => {

        const url = 'https://shoppingcart-e3779.firebaseio.com/cart.json';
        const copyOfProductData = accToAdd
        console.log('data to send', copyOfProductData)
        try {
            const response = await Axios.post(url, copyOfProductData)
            console.log('success', response)

        } catch (error) {
            console.log('error', error)
        }

    }
    const addWishAccount = async (accToAddToWish) => {
        console.log('account to be added to wish list', accToAddToWish)
        setWishListClicked(true)
        /* if (productData.id === accToAddToWish) {
            console.log('id are matching')
        } */
        addDataToWishList(accToAddToWish)
    }
    const addDataToWishList = async (accToAddToWish) => {
        const url = 'https://shoppingcart-e3779.firebaseio.com/wishlist.json';
        const copyOfProductData = accToAddToWish
        console.log('data to send', copyOfProductData)
        try {
            const response = await Axios.post(url, copyOfProductData)
            console.log('success', response)

        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        console.log('calling function')
        handleSubmit()
    }, [])
    React.useEffect(() => {
        const results = productData.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm)
        });
        setSearchResults(results);
    }, [searchTerm]);

    React.useEffect(() => {
        w1 = 1
        console.log('wishlistClicked', w1)

    }, [wishlistClicked]);

    return (
        <>
            <div className="form">
                <input
                    className="form-group"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>


            {console.log(searchResults)}
            {searchResults.map((val, key) => {
                return (
                    <>

                        <div className="card col-md-2 mt-2 mb-2 ml-1 float-left p-2" style={{ height: '350px' }} >
                            <div class="row">
                                <div class="col-md-6">
                                </div>
                                <div class="col-md-6">
                                    <i class="fa fa-heart-o fa-2x float-right bg-transparent"  onClick={() => { addWishAccount(val) }} aria-hidden="true"></i>
                                </div>
                            </div>
                            <img src={val.image} className=" p-2" style={{ width: '100px' }, { height: '230px' }} />

                            <div className="row ">
                                <div className="col-md-6">
                                    <h5 className="float-right">{val.brand}</h5>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="text-center">{val.price}/-</h5>
                                </div>
                            </div>
                            <button className="btn btn-danger btn-lg " onClick={() => { addAccount(val) }}>Add To Cart<i class="fa fa-shopping-cart fa-1x float-left" aria-hidden="true"></i></button>
                        </div>

                    </>)
            })}

        </>
    )
}

