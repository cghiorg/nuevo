import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography, Stack, Switch, Box } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Slider from '@mui/material/Slider';
import { makeStyles } from '@material-ui/styles';
import { apiUrl } from "../../service/Globals";


const DetalleDialogObj = (props) => {
  const useStyles = makeStyles({
    root: {
      width: "50px",
      height: "24px",
      padding: "0px"
    },
    switchBase: {
      color: "#818181",
      padding: "1px",
      "&$checked": {
        "& + $track": {
          backgroundColor: "#23bf58"
        }
      }
    },
    thumb: {
      color: "white",
      width: "20px",
      height: "20px",
      margin: "1px"
    },
    track: {
      borderRadius: "20px",
      backgroundColor: "#818181",
      opacity: "1 !important",
      "&:after, &:before": {
        color: "white",
        fontSize: "11px",
        position: "absolute",
        top: "6px"
      },
      "&:after": {
        content: "'SI'",
        left: "8px"
      },
      "&:before": {
        content: "'NO'",
        right: "7px"
      }
    },
    checked: {
      color: "#23bf58 !important",
      transform: "translateX(26px) !important"
    }
  });

  const objetivoId = props.objetivoSeleccionado.id

  const classes = useStyles();

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    descripcion_alternativa: "",
    createdAt: "",
    es_tema_estrategico: false,
    situacion_actual: "",
    situacion_deseada: "",
    prefer: 0,
    id_estructura: "",
    parent: "",
    id_actividad: "",
  })

  useEffect(() => {
    fetchdatos();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchdatos = async () => {
    const res = await fetch(apiUrl + 'objetivo/' + objetivoId);
    const data = await res.json();
    try {
      setState(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 0.25,
      label: '0.25',
    },
    {
      value: 0.50,
      label: '0.50',
    },
    {
      value: 0.75,
      label: '0.75',
    },
    {
      value: 1,
      label: '1',
    },
  ];


  return (
    <div >
      <br />
      <TextField fullWidth label="Nombre" name="nombre" value={state.nombre || ""} disabled/>
      <br />  <br />
      <TextField fullWidth label="Descripcion" name="descripcion" value={state.descripcion || ""} disabled/>
      <br />  <br />
      <TextField fullWidth label="Descripcion alternativa" name="descripcion_alternativa" value={state.descripcion_alternativa || ""}  disabled/>
      <br />  <br />
      <Stack spacing={3} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Typography id="prefer">
          El objetivo es un Tema Estrategico
        </Typography>
        <Switch classes={{ root: classes.root, switchBase: classes.switchBase, thumb: classes.thumb, track: classes.track, checked: classes.checked }}
          checked={state.es_tema_estrategico}  name="es_tema_estrategico" disabled/>
      </Stack>
      <br />

      <TextField fullWidth label="Situacion Actual" name="situacion_actual" value={state.situacion_actual || ""}  multiline rows={2} disabled/>
      <br />  <br />
      <TextField fullWidth label="Situacion Deseada" name="situacion_deseada" value={state.situacion_deseada || ""}  multiline rows={2} disabled/>
      <br />  <br />
      <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
        <Typography id="prefer" >
          Marcador "Prefer"
        </Typography>
        <Box sx={{ width: 380 }}>
          <Slider defaultValue={0} min={0} step={0.05} max={1} name="prefer" value={state.prefer} valueLabelDisplay="auto" marks={marks} disabled/>
        </Box>
      </Stack>
      <br />  <br />
      <DialogActions>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogDetalle()}>Cerrar</Button>
      </DialogActions >
    </div>
  )
}
export default DetalleDialogObj;
