import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Button, DialogActions, MenuItem } from '@mui/material';
import { apiUrl } from "../../service/Globals";

const DetalleDialog = (props) => {
  const cargoId = props.cargoSeleccionado.id
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchdatos();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchdatos = async () => {
    const res = await fetch(apiUrl + 'estitem/' + cargoId);
    const data = await res.json();
    try {
      setTableData(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div >
      <br />
      <TextField fullWidth label="Nombre" name="name" value={tableData.name || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Letra" name="letra" value={tableData.letra || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Mission" name="mission" value={tableData.mission || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Decreto" name="decreto" value={tableData.decreto || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Marco legal" name="marco_legal" value={tableData.marco_legal || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Diagnostico" name="diagnostico" value={tableData.diagnostico || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Procesos participativos" name="procesos_participativos" value={tableData.procesos_participativos || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Function" name="function" value={tableData.function || ''} disabled />
      <br /> <br />
      <TextField
        fullWidth
        select
        name='parent'
        label="Dependiente"
        value={tableData.parent || ""}
        disabled
      >
        {props.datos.map((option) => (
          <MenuItem key={option.id} value={option.parent} name='parent'>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {/* {valuesArray.filter(c => c.id === props.cargoSeleccionado.parent).map(filtro => (
         <TextField label="Dependencia" name="parent" value={filtro.name} disabled />
      ))}
      <TextField fullWidth label="Dependencia" name="parent" key={filtro.id.toString()} value={filtro.name} disabled /> */}
      <br />
      <DialogActions>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogDetalle()}>Cerrar</Button>
      </DialogActions >
    </div>
  )
}

export default DetalleDialog;