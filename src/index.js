import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './styles/scss/index.scss';

createRoot(document.getElementById('root')).render(<App />);

serviceWorker.unregister();
