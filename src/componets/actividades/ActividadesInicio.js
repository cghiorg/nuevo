import React, { useEffect, useState } from "react";
import Internacional from '../../service/Internacional';
import { apiUrl } from "../../service/Globals";
import MaterialTable from "@material-table/core";
import { Grid, Icon } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EliminarActividad from "./EliminarDialogAct";
import DetalleDialogAct from "./DetalleDialogAct";
import InsertarDialogAct from "./InsertarDialogAct";
import EditarDialogAct from "./EditarDialogAct";


function ActividadesIncio() {

    const [dialogInsertar, setdialogInsertar] = useState(false);
    const [dialogEditar, setdialogEditar] = useState(false);
    const [dialogEliminar, setdialogEliminar] = useState(false);
    const [dialogDetalle, setdialogDetalle] = useState(false);
    const [actividadSeleccionada, setActividadseleccionado] = useState({
        id: "",
        name: "",
    });


    const [reRender, setReRender] = useState(false);

    // Selecciona el Objetivo para:
    const seleccionarActividad = (obj, accion) => {
        setActividadseleccionado(obj);
        (accion === "Insertar") ? abrirCerrardialogInsertar()
            :
            (accion === "Editar") ? abrirCerrardialogEditar()
                :
                (accion === "Detalle") ? abrirCerrardialogDetalle()
                    :
                    abrirCerrardialogEliminar()
    }

    // Abrir o Cerrar ventana dialog (insertar)
    const abrirCerrardialogInsertar = () => {
        //     setReRender(true)
        setdialogInsertar(!dialogInsertar);
    }

    // Abrir o Cerrar ventana dialog (editar)
    const abrirCerrardialogEditar = () => {
        setReRender(true)
        setdialogEditar(!dialogEditar);
    }

    // Abrir o Cerrar ventana dialog (Borrar)
    const abrirCerrardialogEliminar = () => {
        //      setReRender(true)
        setdialogEliminar(!dialogEliminar);
    }

    // Abrir o Cerrar ventana dialog (Detalle)
    const abrirCerrardialogDetalle = () => {
        setdialogDetalle(!dialogDetalle);
    }

    const [datos, setdatos] = useState();

    useEffect(() => {
        setReRender(false);
        fetchdatos();
    }, [reRender]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchdatos = async () => {
        const res = await fetch(apiUrl + "actividad/");
        const data = await res.json();
        try {
            setdatos(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <MaterialTable
                columns={[
                    {
                        title: 'Nombre', field: 'name'
                    },
                    // { title: 'Letra', field: 'id_estructura', rendeBur: rowData =>{ buscarEstructuraId(rowData.id_estructura)}},
                ]}
                title="Administrar Actividades"
                data={datos}
                collapseContent={true}
                localization={Internacional}
                options={{
                    actionsColumnIndex: -1,
                }}
                actions={[
                    {
                        icon: () => <Icon color="primary">article</Icon>,
                        tooltip: 'Ver detalle de Actividad',
                        onClick: (event, rowData) => {
                            // Funcion para ver el detalleS
                            seleccionarActividad(rowData, "Detalle")
                        }
                    },
                    {
                        icon: () => <Icon color="success">edit</Icon>,
                        tooltip: 'Editar Actividad',
                        onClick: (event, rowData) => {
                            // Funcion para editar
                            seleccionarActividad(rowData, "Editar")
                        }
                    },
                    {
                        icon: () => <Icon color="warning">delete_forever</Icon>,
                        tooltip: 'Borrar Actividad',
                        onClick: (event, rowData) => {
                            // Funcion para Borrar
                            seleccionarActividad(rowData, "Eliminar")
                        }
                    },
                    {
                        icon: () => <Icon color='secondary'>add_circle</Icon>,
                        tooltip: 'Crear nueva Actividad',
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            // Funcion para crear uno nuevo
                            seleccionarActividad(rowData, "Insertar")
                        }
                    },
                ]}
            />
            {/* Dialogo Mostar */}
            <Dialog fullWidth maxWidth="lg" open={dialogDetalle} onClose={abrirCerrardialogDetalle}>
                <DialogTitle>Ver detalle del Objetivo</DialogTitle>
                <DialogContent>
                    <DetalleDialogAct actividadSeleccionada={actividadSeleccionada} abrirCerrardialogDetalle={abrirCerrardialogDetalle} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Editar*/}
            <Dialog fullWidth maxWidth="lg" open={dialogEditar} onClose={abrirCerrardialogEditar}>
                <DialogTitle>Editar el Objetivo</DialogTitle>
                <DialogContent>
                    <EditarDialogAct actividadSeleccionada={actividadSeleccionada} abrirCerrardialogEditar={abrirCerrardialogEditar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Insertar*/}
            <Dialog fullWidth maxWidth="lg" open={dialogInsertar} onClose={abrirCerrardialogInsertar}>
                <DialogTitle>Insertar nueva Actividad</DialogTitle>
                <DialogContent>
                    <InsertarDialogAct actividadSeleccionada={actividadSeleccionada} abrirCerrardialogInsertar={abrirCerrardialogInsertar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Elininar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
                <DialogContent>
                    <EliminarActividad actividadSeleccionada={actividadSeleccionada} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ActividadesIncio