import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {MyProvider} from './context';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<MyProvider>
				<App />
			</MyProvider>
		</BrowserRouter>
	</React.StrictMode>
);
