import React from 'react'
import auth from '../../Firebase/Firebase.init';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);

    const [user, loading, error] = useAuthState(auth);

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const handleSignIn = () => {
        signInWithGoogle()
    }

    if (user) {
        const url = 'http://localhost:5000/login';


        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: user.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("accessToken", data.token);
                navigate(from, { replace: true });
            });

    }

    return (
        <div className='container text-center mt-5'>
            <button type="button" className="btn btn-warning" onClick={handleSignIn} >Google Sign in</button>
        </div>
    )
}

export default Login