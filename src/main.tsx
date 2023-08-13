import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ShoppingCartProvider} from './Context/index.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ShoppingCartProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ShoppingCartProvider>
	</React.StrictMode>
);
