import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './styles/scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
