import { DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import React from "react";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { apiUrl } from "../../service/Globals";

const EliminarActividad = (props) => {

    let actividadId = props.actividadSeleccionada.id;

    const [tableData, setTableData] = useState({
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
        id_ods: null,
        id_eje: null,
        id_finalidadyfuncion: null,
        id_politicapublica: null,
        beneficiario: []
    });

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
                // console.log(response.status);     
                return response.json();
            })
    }

    const cambiaractivo = () => {
        setTableData(tableData => ({
            ...tableData,
            ['activo']: false
        }))
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
                Esta seguro que desea eliminar la ACTIVIDAD  <b>{props.actividadSeleccionada.name}</b>
                <br />  <br />
            </DialogContentText>
            <DialogActions>
                <Button variant='outlined' color="warning" onClick={() => { cambiaractivo(); delActividad(props.actividadSeleccionada.id); Aviso(); props.abrirCerrardialogEliminar() }}>Eliminar</Button>
                <Button variant='contained' color="primary" onClick={() => props.abrirCerrardialogEliminar()}>Cancelar</Button>
            </DialogActions>
        </div>
    )
}

export default EliminarActividad;