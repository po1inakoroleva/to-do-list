import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import store from './slices/index';

const mountNode = document.getElementById('to-do-list');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
