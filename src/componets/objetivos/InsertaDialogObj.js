import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography, Stack, Switch, Box, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Slider from '@mui/material/Slider';
import { makeStyles } from '@material-ui/styles';
import { apiUrl } from "../../service/Globals";

const InsertarDialogObj = (props) => {
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

  const hoy = new Date();

  const objetivoId = props.objetivoSeleccionado.id

  const classes = useStyles();

  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    descripcion_alternativa: "",
    createdAt: hoy,
    es_tema_estrategico: false,
    situacion_actual: "",
    situacion_deseada: "",
    prefer: 1,
    id_estructura: "",
    parent: "",
    id_actividad: "",
  })

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "es_tema_estrategico") {
      setState({
        ...state,
        [evt.target.name]: evt.target.checked,
      });
    } else {
      setState({
        ...state,
        [evt.target.name]: value
      });;
    }

 
  }

  
  // Editar el cargo
  const EditarObjetivo = () => {
    fetch(apiUrl+'setobjetivo/',
      {
        method: "PUT", headers: { "Content-type": "application/json" },
        body: JSON.stringify(state)
      })
      .then(response => {
        // console.log(response.status);
        return response.json();
      })
    // .then(data => console.log(data));
  }

  const marks = [
    {
      value: 0.1,
      label: '0.1',
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
      <TextField fullWidth label="Nombre" name="nombre" value={state.nombre || ""} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Descripcion" name="descripcion" value={state.descripcion || ""} onChange={handleChange} />
      <br />  <br />
      <TextField fullWidth label="Descripcion alternativa" name="descripcion_alternativa" value={state.descripcion_alternativa || ""} onChange={handleChange} />
      <br />  <br />
      <Stack spacing={3} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Typography id="prefer">
          El objetivo es un Tema Estrategico
        </Typography>
        <Switch classes={{ root: classes.root, switchBase: classes.switchBase, thumb: classes.thumb, track: classes.track, checked: classes.checked }}
           checked={state.es_tema_estrategico} onChange={handleChange} name="es_tema_estrategico" />
      </Stack>
      <br />

      <TextField fullWidth label="Situacion Actual" name="situacion_actual" value={state.situacion_actual || ""} onChange={handleChange} multiline rows={2} disabled={!state.es_tema_estrategico}/>
      <br />  <br />
      <TextField fullWidth label="Situacion Deseada" name="situacion_deseada" value={state.situacion_deseada || ""} onChange={handleChange} multiline rows={2}  disabled={!state.es_tema_estrategico}/>
      <br />  <br />
      <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
        <Typography id="prefer" >
          Marcador "Prefer"
        </Typography>
        <Box sx={{ width: 380 }}>
          <Slider defaultValue={0.1} min={0.1} step={0.05} max={1} name="prefer" value={state.prefer} onChange={handleChange} valueLabelDisplay="auto" marks={marks} />
        </Box>
      </Stack>
      <br />  <br />
      
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
            {option.nombre}
          </MenuItem>
        ))}
      </TextField>
      <br />  <br />
      <DialogActions>
        <Button variant='contained' color="primary" onClick={() => { EditarObjetivo(); props.abrirCerrardialogInsertar() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogInsertar()}>Cerrar</Button>
      </DialogActions >
    </div>
  )
}
export default InsertarDialogObj;
