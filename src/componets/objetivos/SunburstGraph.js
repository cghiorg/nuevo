import React, { useState, useEffect } from 'react'
import { apiUrl } from '../../service/Globals';
import Plot from "react-plotly.js";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';


const PlotlyComponent = (props) => {

    const hoy = new Date();
    var datestring = ("0" + hoy.getDate()).slice(-2) + "-" + ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" + hoy.getFullYear();

    let urlApi = apiUrl + "tablero/" + props.idObjetivo + "/" + datestring;

    console.log(urlApi);

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        fetch(urlApi)
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const info = Object.assign({}, tableData.data);

    if (!info) return null
    return (
        <>
            <AppBar sx={{ backgroundColor : '#FF8C00', position: 'relative' }} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.abrirCerrardialogSunburst}>
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Grafico Sunburst
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent >
            <Plot
                data={[
                    info[0]
                ]}
                style={{ width: '100%', height: '100%' }}
                layout={{
                    autosize: true,
                }}
            />
            </DialogContent>
        </>
    )
}

export default PlotlyComponent;