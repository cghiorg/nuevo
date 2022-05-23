import { React, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Grid, Stack, Box, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { apiUrl } from "../../service/Globals";


const EditarDialogAct = (props) => {

  const actividadId = props.actividadSeleccionada.id

  const [tacti, settacti] = useState([]);
  const [objet, setobjet] = useState([]);
  const [ods, setods] = useState([]);
  const [eje, seteje] = useState([]);
  const [finalidadyfuncion, setfinalidadyfuncion] = useState([]);
  const [politicapublica, setpoliticapublica] = useState([]);
  // const [benef, setbenef] = useState([]);


  const [state, setState] = useState({
    name: "",
    producto: "",
    resultado: "",
    problema: null,
    productos_secundarios: null,
    ref_presupuesto: null,
    duracion: 1,
    activo: true,
    Id_Tipo_Actividad: 0,
    id_Estructura: 0,
    id_Objetivo: 0,
    id_ods: 0,
    id_eje: 0,
    id_finalidadyfuncion: 0,
    id_politicapublica: 0,
    beneficiario: []
  });

  useEffect(() => {
    fetchdatosact();
    fetchtact();
    fetchobjet();
    fetchods();
    fetcheje();
    fetchfinalidad();
    fetchPpublica();
    // fetchBenef();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchdatosact = async () => {
    const res = await fetch(apiUrl + 'actividad/' + actividadId);
    const data = await res.json();
    try {
      setState(data);
    } catch (err) {
      console.log(err);
    }
  }



  // Carga Tablas accesorias
  const fetchtact = async () => {
    const res = await fetch(apiUrl + 'tact/');
    const data = await res.json();
    try {
      settacti(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchobjet = async () => {
    const res = await fetch(apiUrl + 'objetivo/');
    const data = await res.json();
    try {
      setobjet(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchods = async () => {
    const res = await fetch(apiUrl + 'ods/');
    const data = await res.json();
    try {
      setods(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetcheje = async () => {
    const res = await fetch(apiUrl + 'eje/');
    const data = await res.json();
    try {
      seteje(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchfinalidad = async () => {
    const res = await fetch(apiUrl + 'fyf/');
    const data = await res.json();
    try {
      setfinalidadyfuncion(data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchPpublica = async () => {
    const res = await fetch(apiUrl + 'pp/');
    const data = await res.json();
    try {
      setpoliticapublica(data);
    } catch (err) {
      console.log(err);
    }
  }

  // const fetchBenef = async () => {
  //   const res = await fetch(apiUrl + 'benef/');
  //   const data = await res.json();
  //   try {
  //     setbenef(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  // Insertar el Actividad
  const insertarActividad = () => {
    fetch(apiUrl + 'setactividad/',
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
            <TextField fullWidth label="Nombre" name="name" value={state.name || ""}  />
            <br />  <br />
            <TextField fullWidth label="Producto" name="producto" value={state.producto || ""}  />
            <br />  <br />
            <TextField fullWidth label="Resultado" name="resultado" value={state.resultado || ""} multiline rows={2}  />
            <br />  <br />
            <TextField fullWidth label="Problema" name="problema" value={state.problema || ""}  />
            <br />  <br />
            <TextField fullWidth label="Productos Secundarios" name="productos_secundarios" value={state.productos_secundarios || ""}  />
            <br />  <br />
            <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
              <TextField fullWidth label="Referenmcia Presupuesto" name="ref_presupuesto" value={state.ref_presupuesto || ""}  />
              <TextField fullWidth label="Duracion" name="duracion" value={state.duracion || ""}  />
            </Stack>
            <br />
            <TextField fullWidth select name='Id_Tipo_Actividad' label="Tipo de Actividad" value={state.Id_Tipo_Actividad || ""} onChange={handleChange} >
              {tacti.map((option) => (
                <MenuItem key={option.id} value={option.id} name='Id_Tipo_Actividad'>
                  {option.descripcion}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
          <Grid item xs={6}>
            <br />
            <TextField fullWidth select name='id_Objetivo' label="Objetivo" value={state.id_Objetivo || ""} onChange={handleChange} >
              {objet.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_Objetivo'>
                  {option.nombre}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='id_ods' label="ODS" value={state.id_ods || ""} onChange={handleChange}>
              {ods.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_ods'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='id_eje' label="Eje" value={state.id_eje || ""} onChange={handleChange}>
              {eje.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_eje'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='id_finalidadyfuncion' label="Finalidad y Funcion" value={state.id_finalidadyfuncion || ""} onChange={handleChange}>
              {finalidadyfuncion.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_finalidadyfuncion'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <TextField fullWidth select name='id_politicapublica' label="Politica Publica" value={state.id_politicapublica || ""} onChange={handleChange}>
              {politicapublica.map((option) => (
                <MenuItem key={option.id} value={option.id} name='id_politicapublica'>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />  <br />
            <Autocomplete
              multiple
              id="tags-filled"
              options={state.beneficiario.map((option) => option.name)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Beneficiarios"
                  placeholder="Beneficiarios"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <DialogActions>
        <Button variant='contained' color="primary" onClick={() => { insertarActividad(); props.abrirCerrardialogEditar() }}>Guardar</Button>
        <Button variant='contained' color="warning" onClick={() => props.abrirCerrardialogEditar()}>Cerrar</Button>
      </DialogActions >
    </>
  )
}
export default EditarDialogAct;
