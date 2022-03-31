import React from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem, Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';

const InsertarDialog = (props) => {

  const [estado, setState] = React.useState({
    name: '',
    letra: '',
    mission: '',
    decreto: '',
    marco_legal: '',
    diagnostico: '',
    procesos_participativos: '',
    function: '',
    parent: props.cargoSeleccionado.id
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...estado,
      [evt.target.name]: value
    });
  }

  // Editar el cargo
  const EditarCargo = () => {
    fetch(`http://localhost:8000/api/setest/`,
      {
        method: "PUT", headers: { "Content-type": "application/json" },
        body: JSON.stringify(estado)
      })
      .then(response => {
        console.log(response.status);
      })
  }

  return (
    <div >
      <TextField fullWidth label="Nombre" name="name" value={estado.name} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Letra" name="letra" value={estado.letra} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Mission" name="mission" value={estado.mission} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Decreto" name="decreto" value={estado.decreto} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Marco legal" name="marco_legal" value={estado.marco_legal} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Diagnostico" name="diagnostico" value={estado.diagnostico} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Procesos participativos" name="procesos_participativos" value={estado.procesos_participativos} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Function" name="function" value={estado.function} onChange={handleChange} />
      <br />
      <br />
      <TextField
        fullWidth
        select
        name='parent'
        label="Dependiente"
        value={estado.parent || ""}
        onChange={handleChange}
      >
        {props.datos.map((option) => (
          <MenuItem key={option.id} value={option.id} name='parent'>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <DialogActions>
        <Button variant='contained' color="primary" onClick={() => { EditarCargo(); props.abrirCerrardialogInsertar() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogInsertar()}>Cerrar</Button>
      </DialogActions >
    </div>
  )
}
export default InsertarDialog;