import { DialogContentText, DialogTitle, DialogActions, Checkbox } from '@mui/material';
import React from "react";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { apiUrl } from "../../service/Globals";

const EliminarActividad = (props) => {

    let actividadId = props.actividadSeleccionada.id;
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            cambiaractivo();
        };
    };
    const [tableData, setTableData] = useState();

    useEffect(() => {
        fetchdatosOb();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchdatosOb = async () => {
        const res = await fetch(apiUrl + 'actividad/' + actividadId);
        const data = await res.json();
        try {
            setTableData(data);
        } catch (err) {
            console.log(err);
        }
    }

    // Eliminar el cargo
    const delActividad = () => {
        fetch(apiUrl + 'setactividad/' + actividadId,
            {
                method: "PATCH", headers: { "Content-type": "application/json" },
                body: JSON.stringify(tableData)
            })
            .then(response => {
                console.log(response.status);
                return response.json();
            })
    }

    function cambiaractivo() {
        setTableData({
            activo: false,
        });
        console.log(tableData.activo)
    }

    // Aviso de Borrado
    const { enqueueSnackbar } = useSnackbar();
    const Aviso = () => {
        enqueueSnackbar('La Actividad ha sido borrada', {
            variant: 'warning',
        });
    }

    return (
        <div >
            <DialogTitle color='#FF7F50'>Eliminar Actividad</DialogTitle>
            <DialogContentText paddingLeft={3} paddingRight={3} >
                {console.log(props.actividadSeleccionada.name)}
                Para eliminar la ACTIVIDAD  <b>{props.actividadSeleccionada.name}</b>, debe tildar la siguiente casilla 
                <Checkbox
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <br />  <br />
            </DialogContentText>
            <DialogActions>
                <Button variant='outlined' color="warning" onClick={() => { cambiaractivo(); delActividad(props.actividadSeleccionada.id); Aviso(); props.abrirCerrardialogEliminar() }}>Confirmar</Button>
                <Button variant='contained' color="primary" onClick={() => props.abrirCerrardialogEliminar()}>Cancelar</Button>
            </DialogActions>
        </div>
    )
}

export default EliminarActividad;