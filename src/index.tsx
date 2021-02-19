import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NormalizedCacheObject, ApolloClient, gql, InMemoryCache } from '@apollo/client';
import './assets/css/index.scss';


export default class Main {
  
    public apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor() {
        this.apolloClient = new ApolloClient({
            uri: 'http://localhost:7000/graphql',
            cache: new InMemoryCache()
        });

        ReactDOM.render(
            <React.StrictMode>
                <App apolloClient={this.apolloClient} />
            </React.StrictMode>,
            document.getElementById('main-root')
        );
    }
}

new Main();
reportWebVitals();
