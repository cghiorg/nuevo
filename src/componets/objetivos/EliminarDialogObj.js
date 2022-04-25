import { DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import React from "react";
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

const EliminarObjetivo = (props) => {
    // Eliminar el cargo
    const eliminarObjetivo = () => {
        let objetivoId = props.objetivoSeleccionado.id
        fetch('http://192.168.1.28:8000/api/delobjetivo/' + objetivoId, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('Borrado')
            }).catch(err => {
                console.error(err)
            });
    }
    // Aviso de Borrado
    const { enqueueSnackbar } = useSnackbar();
    const Aviso = () => {
        enqueueSnackbar('El Objetivo ha sido borrado', {
            variant: 'warning',
        });
    }
    return (
        <div >
            <DialogTitle color='#FF7F50'>Eliminar Objetivo</DialogTitle>
            <DialogContentText paddingLeft={3} paddingRight={3} >
                {console.log(props.objetivoSeleccionado.nombre)}
                Esta seguro que desea eliminar el OBJETIVO  <b>{props.objetivoSeleccionado.nombre}</b>
                <br />  <br />
            </DialogContentText>
            <DialogActions>
                <Button variant='outlined' color="warning" onClick={() => { eliminarObjetivo(props.ObjetivoSeleccionado.id); Aviso(); props.abrirCerrardialogEliminar() }}>Eliminar</Button>
                <Button variant='contained' color="primary" onClick={() => props.abrirCerrardialogEliminar()}>Cancelar</Button>
            </DialogActions>
        </div>
    )
}

export default EliminarObjetivo;
