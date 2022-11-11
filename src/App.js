import React from 'react'
import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
 return (
   // Provide the client to your App
  <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <AppRoutes />
      </BrowserRouter>  
   </QueryClientProvider>
 )
}

export default App;
