
import React, { useState } from "react";
import MaterialTable from '@material-table/core';
import Internacional from '../../service/Internacional';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import datos from '../../puesto.json'
import datosTemas from '../../reporte.json'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";


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


export default function ObjetivoIncio() {

    const datoEstructura = datos.estructura;
    const datosDependecias = datos.dep;
    const datosObjetivos = datos.obj;
    const datosActividades = datos.act;
    const [view, setView] = useState(ViewMode.Month);
    const [isChecked, setIsChecked] = useState(false);

    let columnWidth = 60;
    // if (view === ViewMode.Month) {
    //   columnWidth = 300;
    // } else if (view === ViewMode.Week) {
    //   columnWidth = 250;
    // }
    console.log(view)


    return (
        <Grid container spacing={2}>
            <Grid container spacing={2} item xs={12} lg={3} >
                <Grid item xs={12} lg={12}>
                    <Card sx={{ backgroundColor: '#FFA500' }}>
                        <CardContent>
                            <Typography variant="h6" color="#FFFFFF">
                                Puesto:
                            </Typography>
                            <Typography color="#FFFFFF">
                                {datoEstructura.map((data) =>
                                    data.name
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Card sx={{ height: "100%" }}>
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
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            {datosActividades.map((data) =>
                                <List key={data.id} sx={{ width: '100%', maxWidth: 450 }}>
                                    <Typography variant="h6">
                                        Actividades:
                                    </Typography>
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
                                localization={Internacional}
                                parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
                                options={{
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
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                        <Gantt
                            tasks={rows}
                            ViewMode={view}
                            locale='spa'
                            listCellWidth={isChecked ? "155px" : ""}
                            columnWidth={columnWidth}
                            DisplayOption={true}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}


