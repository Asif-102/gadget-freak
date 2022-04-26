import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';

const UploadProduct = () => {

  const [user, loading, error] = useAuthState(auth);

  const handleUpload = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const price = event.target.price.value;

    console.log(name, price)

    const url = 'http://localhost:5000/uploadPd';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name, price
      }),
      headers: {
        'authorization':`${user.email} ${localStorage.getItem("accessToken")}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        event.target.reset();
      });

  }

  return (
    <div className='container'>
      <h2 className='text-center'>Upload Product</h2>

      <div className='w-50 mx-auto'>
        <form onSubmit={handleUpload}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Product Name</label>
            <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Price</label>
            <input type="text" name="price" class="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" class="btn btn-primary">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UploadProduct