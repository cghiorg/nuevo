import React, { useState, useEffect } from 'react'
import { apiUrl } from '../../service/Globals';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import flecha1 from '../../graficos/Flecha1.png';
import flecha2 from '../../graficos/Flecha2.png';
import linea from '../../graficos/linea.png'
import { Box, DialogContent, Grid } from '@mui/material';


function CadenaValorPublico(props) {

    let urlApi = apiUrl + "actividad/" + props.idActividad;
    let urlest = apiUrl + "estitem/" + props.idEstru;
    let urlobj = apiUrl + "objetivo/" + props.idObje;

    const [actData, setactData] = useState([])
    useEffect(() => {
        fetch(urlApi)
            .then((data) => data.json())
            .then((data) => setactData(data))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [objData, setobjData] = useState([])
    useEffect(() => {
        fetch(urlobj)
            .then((data) => data.json())
            .then((data) => setobjData(data))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [estData, setestData] = useState([])
    useEffect(() => {
        fetch(urlest)
            .then((data) => data.json())
            .then((data) => setestData(data))
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <AppBar sx={{ backgroundColor: '#FF8C00', position: 'relative' }} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.abrirCerrardialogCPV}>
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Cadena de Valor Publico
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent >
                <div>
                <Grid container >
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h6" color="#2882F8">
                            {estData.name}
                            <br />
                        </Typography>
                        <Typography>
                            {objData.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6" align='center' backgroundColor="#2882F8" color="#FFFFFF">
                            Sector Publico
                        </Typography>
                    </Grid>
                    <Grid item sx={1}>
                        <img src={linea} style={{
                            height: '100%',
                            maxHeight: 150
                        }} alt={'Imagen Flecha'} />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h6" align='center' backgroundColor="#2882F8" color="#FFFFFF">
                            Sector Privado
                        </Typography>
                            <br />
                            <Box backgroundColor="#FF8C00" sx={{ p: 2, border: '1px dashed grey' }}>
                        <Typography variant="subtitle1" color="#FFFFFF">
                            Beneficiarios
                        </Typography>
                        <Typography variant="subtitle1">
                            {actData.beneficiario}
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}>
                        <Typography color="#2882F8"> Insumos:</Typography>
                        <Box sx={{ p: 1, border: '1px dashed grey', height: 200 }}>

                        </Box>
                    </Grid>
                    <Grid item xs={1} container direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="subtitle2" color="#FF8C00">Operaciones</Typography>
                        <img src={flecha1} style={{
                            width: '100%',
                            maxWidth: 150
                        }} alt={'Imagen Flecha'} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color="#2882F8"> Producto:</Typography>
                        <Box sx={{ p: 1, border: '1px dashed grey', height: 200 }}>
                            {actData.producto}
                        </Box>
                    </Grid>
                    <Grid item xs={1} container direction="column" justifyContent="center" alignItems="center">
                        <img src={flecha2} style={{
                            width: '100%',
                            maxWidth: 150
                        }} alt={'Imagen Flecha'} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color="#2882F8"> Resultado:</Typography>
                        <Box sx={{ p: 1, border: '1px dashed grey', height: 200 }}>
                            {actData.resultado}
                        </Box>
                    </Grid>
                    <Grid item xs={1} container direction="column" justifyContent="center" alignItems="center">
                        <img src={flecha2} style={{
                            width: '100%',
                            maxWidth: 150
                        }} alt={'Imagen Flecha'} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color="#2882F8"> Impacto:</Typography>
                        <Box sx={{ p: 1, border: '1px dashed grey', height: 200 }}>

                        </Box>
                    </Grid>
                </Grid>
                </div>
            </DialogContent>
        </>
    )
}

export default CadenaValorPublico