import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box } from '@mui/material';


export default function TabActividades() {

  const [value, setValue] = React.useState('Actividades');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}

      >
          <Tab
            value="Actividades"
            label="Actividades"
            component={Link}
            to='Actividades'
          />
          <Tab
            label="Indicadores"
            value="Indicadores"
            component={Link}
            to='Indicador'
          />
          <Tab
            label="Parametros"
            value="Parametros"
            component={Link}
            to='Actividades'
          />
        </Tabs>
    </Box>
  );
}