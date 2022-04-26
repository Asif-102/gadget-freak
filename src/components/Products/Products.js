import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const [products, setProducts] = useState([])
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleOrder = (product) => {
        const { name, price } = product;
        // console.log(product, user.email)
        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                email: user.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                toast(data.success)
            });
    }

    return (
        <div>
            <h1>Total Products : {products.length}</h1>
            <div className="row">
                <ToastContainer />
                {
                    products.map(pd => (<div className='col-4 g-4' key={pd._id}>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{pd.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Price : {pd.price}</h6>
                                <button className='btn btn-link' onClick={() => handleOrder(pd)}>Order Now</button>
                            </div>
                        </div>
                    </div>))
                }
            </div>
        </div>
    )
}

export default Products