import React,{useState} from 'react'
import Axios from 'axios'
export default function AddProducts() {
   

    const product = {
        name: '',
        brand: '',
        price: null,
        quantity: null,
        image: ''     
    }
    const [productData, setProductData] = useState(product)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('state data', productData)
        sendDataToDb()
    }
    const sendDataToDb = async () => {
        const url = 'https://shoppingcart-e3779.firebaseio.com/products.json';
        const copyOfProductData = productData
        console.log('data to send', copyOfProductData)
        try {
            const response = await Axios.post(url, copyOfProductData)
            console.log('success', response)
            if (response.status === 200) {
            setProductData({
                name: '',
                brand: '',
                price: '',
                quantity: '',
                image: ''     
            } )
               
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleChange=(e)=>{
        setProductData(
            {
                ...productData,
                [e.target.name]:e.target.value
            }
        )
    }
    return (
        <>
            <div class=" card col-md-4 offset-4 mt-5 ">
                <form class="form " onSubmit={handleSubmit} >
                    <legend class="h1 card-header">Add product here</legend>
                    <div class="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text"
                            name="name"
                            class="form-control"
                            placeholder="enter name"
                            value={productData.name}
                            onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="">brand</label>
                        <input type="text"
                            name="brand"
                            class="form-control"
                            placeholder="enter brand"
                            value={productData.brand}
                            onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="">price</label>
                        <input type="number"
                            name="price"
                            class="form-control"
                            placeholder="enter price"
                            value={productData.price}
                            onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="">Quantity</label>
                        <input type="number"
                            name="text"
                            class="form-control"
                            placeholder="enter quantity"
                            value={productData.quantity}
                            onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="">Image</label>
                        <input type="text"
                            name="image"
                            class="form-control"
                            placeholder="enter image url"
                            value={productData.image}
                            onChange={handleChange} />
                    </div>
                    
                    <button class="btn mt-3 mb-2"
                        type="submit"
                        class="btn btn-primary offset-5 ">
                        Register
                         </button>
                </form>
            </div>
        </>
    )
}
