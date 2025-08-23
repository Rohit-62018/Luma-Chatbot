import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NhostProvider } from '@nhost/react';
import nhost from './Nhost/nhostClient.js'; 
import { ApolloProvider } from "@apollo/client";
import client from "./Nhost/apolloClient.js";

createRoot(document.getElementById('root')).render(
   <NhostProvider nhost={nhost}>
    <ApolloProvider client={client}>
     <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </StrictMode>
   </ApolloProvider>
  </NhostProvider>
);


// headers: () => {
//   const token = nhost.auth.getAccessToken();
//   return token ? { Authorization: `Bearer ${token}` } : { 'x-hasura-role': 'anonymous' };
// },



