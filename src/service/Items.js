import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to='/'>
            <ListItemIcon>
               <Icon>assured_workload</Icon>
            </ListItemIcon>
            <ListItemText primary={'Cargos'} />
        </ListItemButton>

        <ListItemButton component={Link} to='Actividades'>
            <ListItemIcon>
                <Icon>assignment</Icon>
            </ListItemIcon>
            <ListItemText primary={'Actividades'} />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to='/'>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Opciones'} />
        </ListItemButton>

        <ListItemButton component={Link} to='NotFound'>
            <ListItemIcon>
                <CoPresentIcon />
            </ListItemIcon>
            <ListItemText primary={'Cerrar Sesion'} />
        </ListItemButton>
    </React.Fragment>
);
