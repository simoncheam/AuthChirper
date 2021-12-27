import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Navbar from './components/Navbar';
//import Chirps from './views/Chirps';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Register from './views/Register';

import LightTheme from './themes/light';
import DarkTheme from './themes/dark';
import Home from './views/Home';
import { string } from 'prop-types';
import Create from './views/Create';
import ChirpDetail from './views/ChirpDetail';
import Edit from './views/Edit';
import PrivateRoute from './components/common/PrivateRoute';
import Private from './views/Private';
import CreateTag from './views/CreateTag';
import UserOverview from './views/UserOverview';
import Search from './views/Search';
import UserDetail from './views/UserDetail';
import AppMUI_test from './views/AppMUI_test';

const theme = {
	//	primaryColor: '#f8049c',
	primaryColor: '#0091ea',

	secondaryColor: '#ffa500'

	//secondaryColor: '#fdd54f'
};

/* this is how we can set paragraph styles */
const GlobalStyle = createGlobalStyle<ThemeProps>`

body{
  
  background: ${p => p.theme.bodyBackgroundColor};
  min-height: 100vh;
  margin: 0;
  color: ${p => p.theme.bodyFontColor};
  font-family: 'Open Sans';
}
  
`;

interface ThemeProps {

	bodyBackgroundColor?: string,
	bodyFontColor?: string,


};





const App = () => {

	const [theme, setTheme] = useState(LightTheme)



	return (

		<ThemeProvider theme={{
			...theme, setTheme: () => {
				setTheme(s => s.id === 'light' ? DarkTheme : LightTheme);
			}
		}} >



			<GlobalStyle />

			<BrowserRouter>
				{/* <Navbar /> */}


				<Routes>


					{/* Home */}
					<Route path="/" element={<Home />}></Route>

					{/* Register */}
					<Route path="/register" element={<Register />}></Route>

					{/* Login */}
					<Route path="/login" element={<Login />}></Route>

					{/* Create */}
					<Route path="/create" element={<Create />}></Route>
					<Route path="/createTag" element={<CreateTag />}></Route>

					{/* search */}
					<Route path="/search" element={<Search />}></Route>

					<Route path="/muidemo" element={<AppMUI_test />}></Route>






					{/* Private Route */}
					<Route path="/private" element={<PrivateRoute />}>
						{/* private has button panels */}
						<Route index element={<Private />} />
						{/* <Route path="secret1" element={< />} />
						<Route path="vip" element={<OptIn />} /> */}
						 {/* <Route path="users" element={<AuthorOverview />} /> */}
					</Route>




					{/* chirpDetail */}
					<Route path="/chirps/:chirp_id" element={<ChirpDetail />}></Route>

					{/* edit */}
					<Route path="/chirps/:chirp_id/edit" element={<Edit />}></Route>


					{/* users */}
					<Route path="/users" >
						<Route index element={<UserOverview />} />
						<Route path=":user_id" element={<UserDetail />} />

					</Route>





					{/* NotFound */}
					<Route path="*" element={<NotFound />}></Route>

				</Routes>



			</BrowserRouter>
		</ThemeProvider>


	)
}




interface AppProps { }



export default App;
