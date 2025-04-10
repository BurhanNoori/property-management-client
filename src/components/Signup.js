import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	emailValidation,
	passwordValidation,
	dateOfBirthValidation,
	mobileValidation,
	confirmPasswordValidation,
	isEmpty
} from "./LoginValidation";

function Signup() {
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		date: "",
		mobile: "",
		password: "",
		confirmPassword: "",
	});
	const [values, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		date: "",
		mobile: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	

	const inputHandler = (event) => {
		setFormValues((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const dateInputHandler = (event) => {
		setFormValues((prev) => ({
			...prev,
			date: new Date(event.target.value).toISOString().split("T")[0],
		}));
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setErrors((prev) => ({ ...prev, ...emailValidation(values) }));
		setErrors((prev) => ({ ...prev, ...passwordValidation(values) }));
		setErrors((prev) => ({ ...prev, ...mobileValidation(values) }));
		setErrors((prev) => ({ ...prev, ...dateOfBirthValidation(values) }));
		setErrors((prev) => ({ ...prev, ...confirmPasswordValidation(values) }));

		//Check if the errors object is empty it means we need make a post call
		if (isEmpty(errors)) {
			const user = {
				ownerName: values.firstName + " " + values.lastName,
				ownerEmail: values.email,
				phone: values.phone,
				password: values.password,
			};
			axios
				.post("http://localhost:6060/api/v1/user/register", user)
				.then((res) => {
					console.log(res.data);
					navigate("/");
				})
				.catch((err) => console.error(err));
		}
	};
	return (
		<div>
			<form action='' onSubmit={submitHandler} noValidate='novalidate'>
				<h2>Signup Property Management Portal</h2>
				<div>
					<label htmlFor='firstname'>First Name</label>
					<input
						type='text'
						placeholder='First name'
						id='firstname'
						name='firstName'
						onChange={inputHandler}
						value={values.firstName}
					/>
				</div>
				<div>
					<label htmlFor='lastname'>Last Name</label>
					<input
						type='text'
						placeholder='Last name'
						id='lastname'
						name='lastName'
						onChange={inputHandler}
						value={values.lastName}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						placeholder='Email'
						id='email'
						name='email'
						onChange={inputHandler}
						value={values.email}
					/>
					{errors.email && <span>{errors.email}</span>}
				</div>
				<div>
					<label htmlFor='dob'>Date of Birth</label>
					<input
						type='date'
						placeholder='Date of Birth'
						id='dob'
						name='dob'
						min='1900-01-01'
						onChange={dateInputHandler}
						value={values.date}
					/>
					{errors.date && <span>{errors.date}</span>}
				</div>
				<div>
					<label htmlFor='mobile'>Mobile number</label>
					<input
						type='number'
						placeholder='Mobile number'
						id='mobile'
						name='mobile'
						onChange={inputHandler}
						value={values.mobile}
					/>
					{errors.mobile && <span>{errors.mobile}</span>}
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						placeholder='password'
						id='password'
						name='password'
						onChange={inputHandler}
						value={values.password}
					/>
					{errors.password && <span>{errors.password}</span>}
				</div>
				<div>
					<label htmlFor='confirm-password'>Confirm Password</label>
					<input
						type='password'
						name='confirmPassword'
						id='confirm-password'
						onChange={inputHandler}
						value={values.confirmPassword}
					/>
					{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
				</div>
				<div>
					<input type='submit' value='Signup' />
					<button type='reset'>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
