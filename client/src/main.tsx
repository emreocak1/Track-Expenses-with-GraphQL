import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import GridBackground from './components/GridBackground.tsx'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// const client = new ApolloClient({
//   //! Update the uri on production
//   link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include", // ✅ send cookies
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </BrowserRouter>
)
