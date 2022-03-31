import { DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import React from "react";
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

const EliminarDialog = (props) => {
    // Eliminar el cargo
    const eliminarCargo = () => {
        let cargoId = props.cargoSeleccionado.id
        fetch('http://localhost:8000/estructura/' + cargoId, {
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
        enqueueSnackbar('El cargo ha sido borrado', {
            variant: 'warning',
        });
    }
    return (
        <div >
            <DialogTitle color='#FF7F50'>Eliminar Cargo</DialogTitle>
            <DialogContentText paddingLeft={3} paddingRight={3} >
                Esta seguro que desea eliminar el CARGO  <b>{props.cargoSeleccionado.name}</b>
                <br />  <br />
            </DialogContentText>
            <DialogActions>
                <Button variant='outlined' color="warning" onClick={() => { eliminarCargo(props.cargoSeleccionado.id); Aviso('El cargo ha sido borrado', 'warning'); props.abrirCerrardialogEliminar() }}>Eliminar</Button>
                <Button variant='contained' color="primary" onClick={() => props.abrirCerrardialogEliminar()}>Cancelar</Button>
            </DialogActions>
        </div>
    )
}

export default EliminarDialog;
