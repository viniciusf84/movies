import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './stores/SearchStore';
import './styles/scss/index.scss';

ReactDOM.render(<App store={store} />, document.getElementById('root'));

serviceWorker.unregister();
