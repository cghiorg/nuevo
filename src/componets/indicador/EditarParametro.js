import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { apiUrl } from "../../service/Globals";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import "dayjs/locale/es"
import { useSnackbar } from 'notistack';


const EditarParametro = (props) => {

  const indicadorId = props.indicadorSeleccionado.id;
  const [parametroVacio, setparametroVacio] = useState(true);
  const [state, setState] = useState({
    parama: 0.0,
    paramb: 0.0,
    paramc: 0.0,
    paramd: 0.0,
    vigencia: null,
    created: null,
    indicador: indicadorId,
    creator: 2,
  });

  useEffect(() => {
    fetchparametro();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  // Carga Tablas accesorias
  const fetchparametro = async () => {
    const res = await fetch(apiUrl + 'parametroporindicador/' + indicadorId);
    const data = await res.json();
    try {
      if (!data.reduce((a, b) => Object.assign(a, b), {}).id) {
        setparametroVacio(false);
        Aviso();
      } else {
        setState(data.reduce((a, b) => Object.assign(a, b), {}));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Editar Parametro
  const InsertarParametro = () => {
    console.log(state);
    fetch(apiUrl + 'setparametro/',
      {
        method: "POST", headers: { "Content-type": "application/json" },
        body: JSON.stringify(state)
      })
      .then((json) => console.log(json));
  }

  // Agregar nuevo Parametro
  const EditParametro = () => {
    console.log(state)
    fetch(apiUrl + 'setparametro/' + state.id,
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

    if (evt.target.name === "parama") {
      setState({
        ...state,
        [evt.target.name]: parseFloat(value),
      });
    } else if (evt.target.name === "paramb") {
      setState({
        ...state,
        [evt.target.name]: parseFloat(value),
      });
    } else if (evt.target.name === "paramc") {
      setState({
        ...state,
        [evt.target.name]: parseFloat(value),
      });
    }else if (evt.target.name === "paramd") {
      setState({
        ...state,
        [evt.target.name]: parseFloat(value),
      });
    }else {
      setState({
        ...state,
        [evt.target.name]: value,
      });
    }

  }


  // Aviso de Nuevo registro
  const { enqueueSnackbar } = useSnackbar();
  const Aviso = () => {
    enqueueSnackbar('El indicador no tiene parametro, se ha creado uno nuevo!', {
      variant: 'error',
    });
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <br />
            <TextField fullWidth label="Parametro A" name="parama" value={state.parama || ""} type="number" InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Parametro B" name="paramb" value={state.paramb || ""} type="number"  InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Parametro C" name="paramc" value={state.paramc || ""} type="number" InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <br />  <br />
            <TextField fullWidth label="Parametro D" name="paramd" value={state.paramd || ""} type="number" InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <br />  <br />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
              <DatePicker
                label="Vigencia hasta"
                value={state.vigencia}
                onChange={(newValue) => setState({ ...state, vigencia: newValue })}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />  <br />
          </Grid>
        </Grid>
      </Box>
      <br />
      <DialogActions>
        <Button variant='contained' color="primary" onClick={() => { parametroVacio ? EditParametro() : InsertarParametro(); props.abrirCerrardialogParametro() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogParametro()}>Cerrar</Button>
      </DialogActions >
    </>
  )
}
export default EditarParametro;
