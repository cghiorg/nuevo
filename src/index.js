import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Tabla from './componets/cargo/Tabla';
import NotFoundPage from './service/NotFoundPage';
import ObjetivoIncio from './componets/objetivos/ObjetivoIncio';
import ActividadesIncio from './componets/actividades/ActividadesInicio';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Tabla />} />
              <Route path="Objetivos/:id" element={<ObjetivoIncio />} />
              <Route path="Actividades" element={<ActividadesIncio />} />  
            <Route path="NotFound" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



