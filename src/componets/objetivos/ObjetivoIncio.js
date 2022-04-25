
import React, { useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import Internacional from '../../service/Internacional';
import { Card, CardContent, Typography, Icon, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CalendarMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Gantt, ViewMode } from 'gantt-task-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "gantt-task-react/dist/index.css";
import { useNavigate } from 'react-router-dom';
import EliminarObjetivo from './EliminarDialogObj';
import datosTemas from '../../reporte.json'
import { useParams } from "react-router-dom";
import EditarDialogObj from './EditarDialogObj';
import DetalleDialogObj from './DetalleDialogObj';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

let rows = datosTemas.map(te => {
    let datos = {
        start: new Date(te.startdate),
        end: new Date(te.endadate),
        name: String(te.name),
        id: String(te.id),
        type: 'task',
        progress: String(te.percentcomplete),
        dependencies: [String(te.dependencies)],
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
    }
    return datos

});


function ObjetivoIncio() {

    const [isChecked, setIsChecked] = useState(false);
    const [dialogInsertar, setdialogInsertar] = useState(false);
    const [dialogEditar, setdialogEditar] = useState(false);
    const [dialogEliminar, setdialogEliminar] = useState(false);
    const [dialogDetalle, setdialogDetalle] = useState(false);
    const [objetivoSeleccionado, setObjetivoseleccionado] = useState({
        id: "",
        nombre: "",
        parent: ""
    });

    const navigate = useNavigate();
    const [reRender, setReRender] = useState(false);

    // Selecciona el cargo para:
    const seleccionarObjetivo = (obj, accion) => {
        setObjetivoseleccionado(obj);
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

    let params = useParams();
    const [datos, setdatos] = useState([]);

    useEffect(() => {
        setReRender(false)
        fetchdatos();
    }, [reRender]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchdatos = async () => {
        const res = await fetch("http://192.168.1.28:8000/api/resporpuesto/" + params.id);
        const data = await res.json();
        try {
            setdatos(data);
        } catch (err) {
            console.log(err);
        }
    };

    const datoEstructura = datos.estructura;
    const datosDependecias = datos.dep;
    const datosObjetivos = datos.obj;
    const datosActividades = datos.act;

    if (!datosActividades) return null

    return (
        <div>
            <Grid container spacing={2}>
                <Grid container spacing={2} item xs={12} lg={3} >
                    <Grid item xs={12} lg={12}>
                        <Card sx={{ backgroundColor: '#FFA500' }}>
                            <CardContent>
                                <Typography variant="h6" color="#FFFFFF">
                                    Puesto:
                                </Typography>
                                <Typography color="#FFFFFF">
                                    {datoEstructura.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        <br />
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    Dependencias:
                                </Typography>
                                <MaterialTable
                                    columns={[
                                        {
                                            title: 'Nombre',
                                            field: 'name',
                                            cellStyle: (rowDataArray, rowData) => {
                                                const paddingLeft = 7 * rowData.level;
                                                return ({ paddingLeft: paddingLeft });
                                            }
                                        },
                                    ]}
                                    data={datosDependecias}
                                    collapseContent={true}
                                    localization={Internacional}
                                    parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
                                    options={{
                                        paging: false,
                                        showTitle: false,
                                        toolbar: false,
                                        rowStyle: rowData => {
                                            let styles = { transition: 'transform 300ms' };
                                            const levels = rowData.tableData.path.length === 1 ? 0 : rowData.tableData.path.length;
                                            styles = { ...styles, '--left-before': `${levels * 6}px` };
                                            return rowData.tableData.isTreeExpanded
                                                ? {
                                                    ...styles,
                                                    fontWeight: 600,
                                                    backgroundColor: 'rgba(77, 93, 241, 0.08)',
                                                }
                                                : styles;
                                        }
                                    }}

                                />
                            </CardContent>
                        </Card>
                        <br />
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    Actividades:
                                </Typography>
                                {datosActividades.map((data) =>
                                    <List key={data.id} sx={{ width: '100%', maxWidth: 450 }}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <CalendarMonthIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={data.name} secondary={data.producto} />
                                        </ListItem>
                                    </List>
                                )}
                            </CardContent>


                            <CardActions>
                                <Button size="small">Administar Actividades</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2} item xs={12} lg={9}>
                    <Grid item xs={12} lg={12}>
                        <Card>
                            <CardContent>
                                <MaterialTable
                                    columns={[
                                        {
                                            title: 'Nombre', field: 'nombre',
                                            cellStyle: (rowDataArray, rowData) => {
                                                const paddingLeft = 15 * rowData.level;
                                                return ({ paddingLeft: paddingLeft });
                                            }
                                        },
                                        // { title: 'Letra', field: 'id_estructura', rendeBur: rowData =>{ buscarEstructuraId(rowData.id_estructura)}},
                                    ]}
                                    title="Objetivos"
                                    data={datosObjetivos}
                                    collapseContent={true}

                                    actions={[
                                        // {
                                        //   icon: () => <Icon color="warning">ads_click</Icon>,
                                        //   tooltip: 'Agregar Objetivos',
                                        // //   onClick: (event, rowData) => {
                                        // //     navigate('Objetivos')
                                        // //   }
                                        // },
                                        // rowData => ({
                                        //     disabled: rowData.tableData.parentChildData === 0,
                                        //     icon: () => <Icon sx={{ color: '#EB0C43' }}>edit_calendar</Icon>,
                                        //     tooltip: 'Agregar Actividad',

                                        //     //   onClick: (event, rowData) => {
                                        //     //     // Funcion para ver el detalleS
                                        //     //     seleccionarCargo(rowData, "Insertar")
                                        //     //   }
                                        // }),
                                        {
                                            icon: () => <Icon color="primary">article</Icon>,
                                            tooltip: 'Ver detalle',
                                            onClick: (event, rowData) => {
                                                // Funcion para ver el detalleS
                                                seleccionarObjetivo(rowData, "Detalle")
                                            }
                                        },
                                        {
                                            icon: () => <Icon color="success">edit</Icon>,
                                            tooltip: 'Editar Objetivo',
                                            onClick: (event, rowData) => {
                                                // Funcion para editar
                                                seleccionarObjetivo(rowData, "Editar")
                                            }
                                        },
                                        {
                                            icon: () => <Icon color="warning">delete_forever</Icon>,
                                            tooltip: 'Borrar Objetivo',
                                            onClick: (event, rowData) => {
                                                // Funcion para Borrar
                                                seleccionarObjetivo(rowData, "Eliminar")
                                            }
                                        },
                                        {
                                            icon: () => <Icon color='secondary'>add_circle</Icon>,
                                            tooltip: 'Crear nuevo Objetivo',
                                            isFreeAction: true,
                                            //   onClick: (event, rowData) => {
                                            //     // Funcion para crear uno nuevo
                                            //     seleccionarCargo(rowData, "Insertar")
                                            //   }
                                        }
                                    ]}
                                    localization={Internacional}
                                    parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
                                    options={{
                                        actionsColumnIndex: -1,
                                        rowStyle: rowData => {
                                            let styles = { transition: 'transform 300ms' };
                                            const levels = rowData.tableData.path.length === 1 ? 0 : rowData.tableData.path.length;
                                            styles = { ...styles, '--left-before': `${levels * 6}px` };
                                            return rowData.tableData.isTreeExpanded
                                                ? {
                                                    ...styles,
                                                    fontWeight: 600,
                                                    backgroundColor: 'rgba(77, 93, 241, 0.08)',
                                                }
                                                : styles;
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                            <Gantt
                                tasks={rows}
                                ViewMode={ViewMode.Hour}
                                locale='spa'
                                listCellWidth={isChecked ? "155px" : ""}
                                columnWidth={2}
                                DisplayOption={true}
                                headerHeight={0}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            {/* Dialogo Mostar */}
            <Dialog fullWidth maxWidth="sm" open={dialogDetalle} onClose={abrirCerrardialogDetalle}>
                <DialogTitle>Ver detalle del Objetivo</DialogTitle>
                <DialogContent>
                    <DetalleDialogObj objetivoSeleccionado={objetivoSeleccionado} abrirCerrardialogDetalle={abrirCerrardialogDetalle} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Editar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogEditar} onClose={abrirCerrardialogEditar}>
                <DialogTitle>Editar el Objetivo</DialogTitle>
                <DialogContent>
                    <EditarDialogObj objetivoSeleccionado={objetivoSeleccionado} abrirCerrardialogEditar={abrirCerrardialogEditar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Insertar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogInsertar} onClose={abrirCerrardialogInsertar}>
                <DialogTitle>Insertar nuevo cargo</DialogTitle>
                <DialogContent>
                    {/* <InsertarDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogInsertar={abrirCerrardialogInsertar} /> */}
                </DialogContent>
            </Dialog>

            {/* Dialogo Elininar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
                <DialogContent>
                    <EliminarObjetivo objetivoSeleccionado={objetivoSeleccionado} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default ObjetivoIncio