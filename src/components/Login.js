import { useState } from "react";
import { emailValidation, passwordValidation, isEmpty } from "./LoginValidation.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login({ isLogin, clickHandler }) {
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [formInput, setFormInput] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const inputHandler = (event) => {
		setFormInput((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setErrors(prev => ({...prev, ...emailValidation(formInput)}));
        setErrors(prev => ({...prev, ...passwordValidation(formInput)}));
		//console.log(errors);

		//Check if there are no errors we will send the post request for login

		if(isEmpty(errors)){
			const user = {
				ownerEmail: formInput.email,
				password: formInput.password
			};
			axios.post("http://localhost:6060/api/v1/user/login", user)
			.then(res=> { 
				console.log(res.data);
				navigate('/home', {state: {user: res.data.ownerName}})
			}).catch(err => console.error(err));

		}
	};

	return (
		<div>
			<form action='' onSubmit={submitHandler}>
				<h2>Sign in Property Management Portal</h2>
				<div>
					<label>Email</label>
					<input
						onChange={inputHandler}
						type='email'
						placeholder='Enter your email'
						name='email'
					/>
					{errors.email && <span>{errors.email}</span>}
				</div>
				<div>
					<label>Password</label>
					<input
						onChange={inputHandler}
						type='password'
						placeholder='Password'
						name='password'
					/>
					{errors.password && <span>{errors.password}</span>}
				</div>
				<div>
					<input type='submit' value='Login' />
					<button type='button' onClick={clickHandler}>
						Signup
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;