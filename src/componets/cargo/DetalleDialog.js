import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';

const DetalleDialog = (props) => {
  const cargoId = props.cargoSeleccionado.id

  const [tableData, setTableData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/api/estitem/' + cargoId)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const data = Object.assign({}, tableData.data);
  // const valuesArray = Object.entries(data);
  // item = arr.filter(item=>item.name=="k1"); // Buscar en array
  // let selectedProduct = this.props.products.find(product => product.name === this.state.filterText); // Buscar en json

  return (
    <div >
      <br />
      <TextField fullWidth label="Nombre" name="name" value={data.name || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Letra" name="letra" value={data.letra || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Mission" name="mission" value={data.mission || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Decreto" name="decreto" value={data.decreto || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Marco legal" name="marco_legal" value={data.marco_legal || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Diagnostico" name="diagnostico" value={data.diagnostico || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Procesos participativos" name="procesos_participativos" value={data.procesos_participativos || ''} disabled />
      <br />  <br />
      <TextField fullWidth label="Function" name="function" value={data.function || ''} disabled />
      <br /> <br />
      <TextField
        fullWidth
        select
        name='parent'
        label="Dependiente"
        value={data.parent || ""}
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
    </div>
  )
}

export default DetalleDialog;