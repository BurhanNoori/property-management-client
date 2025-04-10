import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
function App() {
	const [isLogin, setLoginState] = useState(true);

	const signupClickHandler = () => {
		setLoginState(() => false);
	};
	return (

		<Router>
			<div className='App'>
			<Routes>
				<Route index element={<Navigate to='/login' replace/>}/>
				<Route path='/login' element={<Login clickHandler={signupClickHandler}/>}/>
				<Route path='/signup' element={<Signup/>}/>
				<Route path='/home' element={<Home/>}/>
			</Routes>
				{!isLogin && <Navigate to='/signup'/>}
			</div>
		</Router>
		
			
	);
}

export default App;