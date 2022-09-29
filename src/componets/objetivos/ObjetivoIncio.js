import React, { useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import Internacional from '../../service/Internacional';
import { Card, CardContent, Typography, Icon, Button, ListItemButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CalendarMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { Gantt, ViewMode } from 'gantt-task-react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "gantt-task-react/dist/index.css";
import { Link } from 'react-router-dom';
import EliminarObjetivo from './EliminarDialogObj';
import datosTemas from '../../reporte.json'
import { useParams } from "react-router-dom";
import EditarDialogObj from './EditarDialogObj';
import DetalleDialogObj from './DetalleDialogObj';
import { apiUrl } from "../../service/Globals";
import { ReactComponent as SunburstIcon } from '../../graficos/sunburst.svg';
import SunburstGraph from "./SunburstGraph";
import Slide from '@mui/material/Slide';
import InsertarDialogObj from "./InsertaDialogObj";
import CadenaValorPublico from "./CadenaValorPublico";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    const [dialogSunburst, setdialogSunburst] = useState(false);
    const [dialogCPV, setdialogCPV] = useState(false);
    const [idActividad, setidActividad] = useState();
    const [idObje, setidObje] = useState();
    const [idEstru, setidEstu] = useState();
    const [objetivoSeleccionado, setObjetivoseleccionado] = useState({
        id: "",
        nombre: "",
        parent: ""
    });

    const [reRender, setReRender] = useState(false);

    // Selecciona el Objetivo para:
    const seleccionarObjetivo = (obj, accion) => {
        setObjetivoseleccionado(obj);
        (accion === "Insertar") ? abrirCerrardialogInsertar()
            :
            (accion === "Editar") ? abrirCerrardialogEditar()
                :
                (accion === "Detalle") ? abrirCerrardialogDetalle()
                    :
                    (accion === "Sunbrust") ? abrirCerrardialogSunburst()
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

    // Abrir o Cerrar ventana dialog (Sunburst)
    const abrirCerrardialogSunburst = () => {
        //     setReRender(true)
        setdialogSunburst(!dialogSunburst);
    }

    // Abrir o Cerrar ventana dialog (CPV)
    const abrirCerrardialogCPV = (idact, idest) => {


        setidActividad(idact);
        setidEstu(idest);
        //     setReRender(true)
        setdialogCPV(!dialogCPV);
    }

    let params = useParams();
    const [datos, setdatos] = useState([]);

    useEffect(() => {
        setReRender(false)
        fetchdatos();
    }, [reRender]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchdatos = async () => {
        const res = await fetch(apiUrl + "resporpuesto/" + params.id);
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
                                            <ListItemButton onClick={() => { abrirCerrardialogCPV(data.id, data.id_Estructura.id) }}  >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <CalendarMonthIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={data.name} secondary={data.producto} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to="/Actividades" >Administar Actividades</Button>
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
                                            onClick: (event, rowData) => {
                                                // Funcion para crear uno nuevo
                                                seleccionarObjetivo(rowData, "Insertar")
                                            }
                                        },
                                        rowData => ({
                                            icon: () => <SunburstIcon height={25} width={25} fill='#1EA896' />,
                                            tooltip: 'Grafico Sunburst',
                                            onClick: (event, rowData) => {
                                                seleccionarObjetivo(rowData, "Sunbrust")
                                            },
                                            hidden: rowData.tableData.path.length === 1 ? 0 : rowData.tableData.path.length,
                                        }),
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
                    <InsertarDialogObj objetivoSeleccionado={objetivoSeleccionado} datos={datosObjetivos} abrirCerrardialogInsertar={abrirCerrardialogInsertar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Elininar*/}
            <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
                <DialogContent>
                    <EliminarObjetivo objetivoSeleccionado={objetivoSeleccionado} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
                </DialogContent>
            </Dialog>

            {/* Dialogo Sunburst*/}
            <Dialog fullScreen open={dialogSunburst} onClose={abrirCerrardialogSunburst} TransitionComponent={Transition}>
                <SunburstGraph idObjetivo={objetivoSeleccionado.id} abrirCerrardialogSunburst={abrirCerrardialogSunburst} />
            </Dialog>

            {/* Dialogo CVP*/}
            <Dialog fullScreen open={dialogCPV} onClose={abrirCerrardialogCPV} TransitionComponent={Transition}>
                <CadenaValorPublico abrirCerrardialogCPV={abrirCerrardialogCPV} idActividad={idActividad} idObje={idObje} idEstru={idEstru}/>
            </Dialog>
        </div>
    )
}
export default ObjetivoIncio