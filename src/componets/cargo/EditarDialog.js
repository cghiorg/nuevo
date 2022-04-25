import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem, Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';


const EditarDialog = (props) => {
  const cargoId = props.cargoSeleccionado.id
  const [state, setState] = useState({
    name: props.cargoSeleccionado.name,
    letra: props.cargoSeleccionado.letra,
    mission: props.cargoSeleccionado.mission,
    decreto: props.cargoSeleccionado.decreto,
    marco_legal: props.cargoSeleccionado.marco_legal,
    diagnostico: props.cargoSeleccionado.diagnostico,
    procesos_participativos: props.cargoSeleccionado.procesos_participativos,
    function: props.cargoSeleccionado.function,
    parent: props.cargoSeleccionado.parent
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  // Editar el cargo
  const EditarCargo = () => {
    fetch('http://192.168.1.28:8000/api/setest/' + cargoId,
      {
        method: "PATCH", headers: { "Content-type": "application/json" },
        body: JSON.stringify(state)
      })
      .then(response => {
        // console.log(response.status);     
        return response.json();
      })
    // .then(data => console.log(data));
  }

  return (
    <div >
      <TextField fullWidth label="Nombre" name="name" value={state.name} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Letra" name="letra" value={state.letra} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Mission" name="mission" value={state.mission} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Decreto" name="decreto" value={state.decreto} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Marco legal" name="marco_legal" value={state.marco_legal} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Diagnostico" name="diagnostico" value={state.diagnostico} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Procesos participativos" name="procesos_participativos" value={state.procesos_participativos} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Function" name="function" value={state.function} onChange={handleChange} />
      <br />
      <br />
      <TextField
        fullWidth
        select
        name='parent'
        label="Dependiente"
        value={state.parent || ""}
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
        <Button variant='contained' color="primary" onClick={() => { EditarCargo(); props.abrirCerrardialogEditar() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogEditar()}>Cerrar</Button>
      </DialogActions >
    </div>
  )
}
export default EditarDialog;
