import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { setCookie } from "nookies";

export default function SignIn() {
    const nameRef = useRef();
    const passwordRef = useRef();

    async function handleSignInButtonClick() {
        const usernameoremail = nameRef.current.value;
        const password = passwordRef.current.value;
        try {
            const response = await axios.post(
                'http://localhost:4000/users/signin',
                { usernameoremail, password },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const { data } = response.data;
            const access_token = data.access_token;
            const user_id = data.user.id;
            console.log(access_token, user_id);
            setCookie(null, 'access_token', access_token, { path: '/' });
            setCookie(null, 'user_id', user_id, { path: '/' });
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-96 border shadow-lg rounded">
            <h1 className="m-5">Sign In</h1>
            <form>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">Username/Email</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="usernameOrEmail"
                        type="text"
                        placeholder="Username or Email"
                        ref={nameRef}
                    />
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        ref={passwordRef}
                    />
                </span>
                <span className="flex mx-5 my-1 text-sm">
                    <p>Don't have an account yet? <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="./signup">Create one</a>.</p>
                </span>
                <span>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignInButtonClick}
                    >
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="./forgotpwd">Forgot Password?</a>
                </span>
            </form>
        </div>
    );
};