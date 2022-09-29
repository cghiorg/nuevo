import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { apiUrl } from "../../service/Globals";


const EditarDialogIndicador = (props) => {

  const indicadorId = props.indicadorSeleccionado.id

  const [ind, setind] = useState([]);
  const [func, setfunc] = useState([]);
  const [actividad, setactividad] = useState([]);
  const [state, setState] = useState(    {
    name: "",
    peso: null,
    definicion: "",
    modo_calculo:  "",
    unidades_medida: "",
    fuente: "",
    periodicidad: null,
    desagregaciones: "",
    id_Tipo_Indicador: null,
    id_actividad: null,
    tipofuncion: null
});

  useEffect(() => {
    fetchindicador();
    fetchdatosact();
    tipoFunc();
    tipoInd();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  // Carga Tablas accesorias
  const fetchindicador = async () => {
    const res = await fetch(apiUrl + 'indicador/' + indicadorId);
    const data = await res.json();
    try {
      setState(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchdatosact = async () => {
    const res = await fetch(apiUrl + 'actividad/');
    const data = await res.json();
    try {
      setactividad(data);
    } catch (err) {
      console.log(err);
    }
  }


  const tipoFunc = async () => {
    const res = await fetch(apiUrl + 'tipofuncion/');
    const data = await res.json();
    try {
      setfunc(data);
    } catch (err) {
      console.log(err);
    }
  }

  const tipoInd = async () => {
    const res = await fetch(apiUrl + 'tipoindicador/');
    const data = await res.json();
    try {
      setind(data);
    } catch (err) {
      console.log(err);
    }
  }

  
  // Editar la indicador
  const editarIndicador = () => {
    console.log(state)
    fetch(apiUrl + 'setindicador/' + indicadorId,
      {
        method: "PATCH", headers: { "Content-type": "application/json" },
        body: JSON.stringify(state)
      })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
    // .then(data => console.log(data));
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <br />
            <TextField fullWidth label="Nombre" name="name" value={state.name || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Peso" name="peso" value={state.peso || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Definicion" name="definicion" value={state.definicion || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Modo de Calculo" name="modo_calculo" value={state.modo_calculo || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Unidades de Medida" name="unidades_medida" value={state.unidades_medida || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Fuente" name="fuente" value={state.fuente || ""} onChange={handleChange} />
            <br />  <br />
          </Grid>
          <Grid item xs={6}>
            <br />
            <TextField fullWidth label="Periodicidad" name="periodicidad" value={state.periodicidad || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Desagregaciones" name="desagregaciones" value={state.desagregaciones || ""} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth select name='id_Tipo_Indicador' label="Tipo de Indicador" value={state.id_Tipo_Indicador || ""} onChange={handleChange}>
              {ind.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_Tipo_Indicador'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='tipofuncion' label="Tipo de Funcion" value={state.tipofuncion || ""} onChange={handleChange}>
              {func.map((option) => (
                <MenuItem key={option.id} value={option.id} name='tipofuncion'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='id_actividad' label="Actividad" value={state.id_actividad || ""} onChange={handleChange}>
              {actividad.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_actividad'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
          </Grid>
        </Grid>
      </Box>
      <br />
      <DialogActions>
        <Button variant='contained' color="primary" onClick={() => { editarIndicador(); props.abrirCerrardialogEditar() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogEditar()}>Cerrar</Button>
      </DialogActions >
    </>
  )
}
export default EditarDialogIndicador;
