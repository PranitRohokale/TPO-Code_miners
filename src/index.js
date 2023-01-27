import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store';
import { ApolloProvider } from '@apollo/client';
import client from "./Utils/ApolloClient"
import { getUserDetails } from './actions/userActions';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getUserDetails())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
