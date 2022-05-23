import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@mui/material';
import Internacional from '../../service/Internacional'
import EditarDialog from '../cargo/EditarDialog';
import DetalleDialog from '../cargo/DetalleDialog'
import EliminarDialog from '../cargo/EliminarDialog';
import InsertarDialog from '../cargo/InsertarDialog';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../../service/Globals";



function Tabla() {
  const [dialogInsertar, setdialogInsertar] = useState(false);
  const [dialogEditar, setdialogEditar] = useState(false);
  const [dialogEliminar, setdialogEliminar] = useState(false);
  const [dialogDetalle, setdialogDetalle] = useState(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState({
    id: "",
    name: "",
    parent: ""
  })
  const [reRender, setReRender] = useState(false)

  const navigate = useNavigate();

  // Selecciona el cargo para:
  const seleccionarCargo = (cargo, accion) => {
    setCargoSeleccionado(cargo);
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

  // Abrir o Cerrar ventana dialog (Detalle)
  const abrirCerrardialogDetalle = () => {
    setdialogDetalle(!dialogDetalle);
  }

  // Obtiene los datos JSON
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    setReRender(false)
    fetch(apiUrl + "est/")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [reRender])
  
  const setColores = {
    1: '#86E140',
    2: '#92F148',
    3: '#B2FF75',
    4: '#D9FFA9',
    5: '#E9FFCE',
    6: '#F3FFE3',
    7: '#FFFFFF'
  };

  return (
    <div>
      <MaterialTable
        title="Estructura"
        data={tableData}
        collapseContent={true}
        actions={[
          {
            icon: () => <Icon color="warning">ads_click</Icon>,
            tooltip: 'Administar Objetivos',
            onClick: (event, rowData) => {
              navigate(`/Objetivos/${rowData.id}`)
            }
          },
          {
            icon: () => <Icon color="primary">addbox</Icon>,
            tooltip: 'Agregar dependencia',
            onClick: (event, rowData) => {
              // Funcion para ver el detalleS
              seleccionarCargo(rowData, "Insertar")
            }
          },
          {
            icon: () => <Icon color="primary">article</Icon>,
            tooltip: 'Ver detalle',
            onClick: (event, rowData) => {
              // Funcion para ver el detalleS
              seleccionarCargo(rowData, "Detalle")
            }
          },
          {
            icon: () => <Icon color="success">edit</Icon>,
            tooltip: 'Editar cargo',
            onClick: (event, rowData) => {
              // Funcion para editar
              seleccionarCargo(rowData, "Editar")
            }
          },
          {
            icon: () => <Icon color="warning">delete_forever</Icon>,
            tooltip: 'Borrar cargo',
            onClick: (event, rowData) => {
              // Funcion de borrado
              seleccionarCargo(rowData, "Eliminar")
            }
          },
          // {
          //   icon: () => <Icon color='secondary'>add_circle</Icon>,
          //   tooltip: 'Crear nuevo cargo',
          //   isFreeAction: true,
          //   onClick: (event, rowData) => {
          //     // Funcion para crear uno nuevo
          //     seleccionarCargo(rowData, "Insertar")
          //   }
          // }
        ]}
        columns={[
          { title: 'Nombre', field: 'name' },
          // { title: 'Mission', field: 'mission' },
          // { title: 'Function', field: 'function' },
        ]}
        localization={Internacional}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
        options={{
          actionsColumnIndex: -1,
          defaultExpanded: true,
          headerStyle: {
            backgroundColor: '#00496F',
            color: '#FFF',
          },
          rowStyle: rowData => {
            if (rowData.tableData.isTreeExpanded === false && rowData.tableData.path.length === 1) {
              return {};
            }
            const rowBackgroundColor = setColores[rowData.tableData.path.length];
            return { backgroundColor: rowBackgroundColor };
          }
        }}
      />

      {/* Dialogo Detalle*/}
      <Dialog fullWidth maxWidth="sm" open={dialogDetalle} onClose={abrirCerrardialogDetalle}>
        <DialogTitle>Ver detalle del Cargo</DialogTitle>
        <DialogContent>
          <DetalleDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogDetalle={abrirCerrardialogDetalle} />
        </DialogContent>
      </Dialog>

      {/* Dialogo Editar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogEditar} onClose={abrirCerrardialogEditar}>
        <DialogTitle>Editar el cargo</DialogTitle>
        <DialogContent>
          <EditarDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogEditar={abrirCerrardialogEditar} />
        </DialogContent>
      </Dialog>

      {/* Dialogo Insertar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogInsertar} onClose={abrirCerrardialogInsertar}>
        <DialogTitle>Insertar nuevo cargo</DialogTitle>
        <DialogContent>
          <InsertarDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogInsertar={abrirCerrardialogInsertar} />
        </DialogContent>
      </Dialog>

      {/* Dialogo Elininar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
        <EliminarDialog cargoSeleccionado={cargoSeleccionado} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
      </Dialog>
    </div>
  );
}
export default Tabla;