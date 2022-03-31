
import React from 'react';
import { SnackbarProvider } from 'notistack';
import MenuPrincipal from './service/menu';
import './App.css'

function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <MenuPrincipal/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
