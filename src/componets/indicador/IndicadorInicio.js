import React, { useEffect, useState } from "react";
import Internacional from '../../service/Internacional';
import { apiUrl } from "../../service/Globals";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Button, Grid, Icon } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EliminarIndicador from "./EliminarDialogIndicador";
import DetalleDialogIndicador from "./DetalleDialogIndicador";
import InsertarDialogIndicador from "./InsertarDialogIndicador";
import EditarDialogIndicador from "./EditarDialogIndicador";
import { useNavigate } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import EditarParametro from "./EditarParametro";


function IndicadorIncio() {

    const navigate = useNavigate();

    const [dialogInsertar, setdialogInsertar] = useState(false);
    const [dialogEditar, setdialogEditar] = useState(false);
    const [dialogEliminar, setdialogEliminar] = useState(false);
    const [dialogDetalle, setdialogDetalle] = useState(false);
    const [dialogParametro, setdialogParametro] = useState(false);

    const [indicadorSeleccionado, setindicadorSeleccionado] = useState({
        id: "",
        name: "",
    });

    const [reRender, setReRender] = useState(false);

    // Selecciona el Indicador para:
    const seleccionarIndicador = (indi, accion) => {
        setindicadorSeleccionado(indi);
        (accion === "Insertar") ? abrirCerrardialogInsertar()
            :
            (accion === "Editar") ? abrirCerrardialogEditar()
                :
                (accion === "Detalle") ? abrirCerrardialogDetalle()
                    :
                    (accion === "Parametro") ? abrirCerrardialogParametro()
                        :
                        abrirCerrardialogEliminar()
    }

    // Abrir o Cerrar ventana dialog (insertar)
    const abrirCerrardialogInsertar = () => {
        setReRender(true)
        setdialogInsertar(!dialogInsertar);
    }

    // Abrir o Cerrar ventana dialog (editar)
    const abrirCerrardialogEditar = () => {
        setReRender(true)
        setdialogEditar(!dialogEditar);
    }

    // Abrir o Cerrar ventana dialog (Borrar)
    const abrirCerrardialogEliminar = () => {
        setReRender(true)
        setdialogEliminar(!dialogEliminar);
    }

    // Abrir o Cerrar ventana dialog (Parametro)
    const abrirCerrardialogParametro = () => {
        setReRender(true)
        setdialogParametro(!dialogParametro);
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
        const res = await fetch(apiUrl + "indicador/");
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
                title="Administrar Indicadores"
                data={datos}
                collapseContent={true}
                localization={Internacional}
                options={{
                    actionsColumnIndex: -1,
                }}
                actions={[
                    {
                        icon: () => <Icon color="primary">article</Icon>,
                        tooltip: 'Ver detalle de Indicador',
                        onClick: (event, rowData) => {
                            // Funcion para ver el detalle
                            seleccionarIndicador(rowData, "Detalle")
                        }
                    },
                    {
                        icon: () => <Icon color="success">edit</Icon>,
                        tooltip: 'Editar Indicador',
                        onClick: (event, rowData) => {
                            // Funcion para editar
                            seleccionarIndicador(rowData, "Editar")
                        }
                    },
                    {
                        icon: () => <Icon color="warning">tune</Icon>,
                        tooltip: 'Editar parametros',
                        onClick: (event, rowData) => {
                            // Funcion para Editar un parametro
                            seleccionarIndicador(rowData, "Parametro")
                        }
                    },
                    {
                        icon: () => <Icon color='secondary'>add_circle</Icon>,
                        tooltip: 'Crear un nuevo Indicador',
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            // Funcion para crear uno nuevo
                            seleccionarIndicador(rowData, "Insertar")
                        }
                    },
                ]}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '0px 10px' }}>
                                <Button variant="contained" endIcon={<ReplyAllIcon />} color="error" onClick={() => navigate(-1)}>
                                    Regresar
                                </Button>
                                <br />  <br />
                            </div>
                        </div>
                    ),
                }}
            />
            {/* Dialogo Mostar */}
            <Dialog fullWidth maxWidth="lg" open={dialogDetalle} onClose={abrirCerrardialogDetalle}>
                <DialogTitle>Ver detalle del Indicador</DialogTitle>
                <DialogContent>
                    <DetalleDialogIndicador indicadorSeleccionado={indicadorSeleccionado} abrirCerrardialogDetalle={abrirCerrardialogDetalle} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Editar*/}
            <Dialog fullWidth maxWidth="lg" open={dialogEditar} onClose={abrirCerrardialogEditar}>
                <DialogTitle>Editar el Indicador</DialogTitle>
                <DialogContent>
                    <EditarDialogIndicador indicadorSeleccionado={indicadorSeleccionado} abrirCerrardialogEditar={abrirCerrardialogEditar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Insertar*/}
            <Dialog fullWidth maxWidth="lg" open={dialogInsertar} onClose={abrirCerrardialogInsertar}>
                <DialogTitle>Insertar nuevo Indicador</DialogTitle>
                <DialogContent>
                    <InsertarDialogIndicador indicadorSeleccionado={indicadorSeleccionado} abrirCerrardialogInsertar={abrirCerrardialogInsertar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Elininar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
                <DialogContent>
                    <EliminarIndicador indicadorSeleccionado={indicadorSeleccionado} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Editar Parametro*/}
            <Dialog fullWidth maxWidth="xs" open={dialogParametro} onClose={abrirCerrardialogParametro}>
            <DialogTitle>Editar parametro</DialogTitle>
                <DialogContent>
                    <EditarParametro indicadorSeleccionado={indicadorSeleccionado} abrirCerrardialogParametro={abrirCerrardialogParametro} />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default IndicadorIncio