import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to='/'>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'Cargos'} />
        </ListItemButton>

        <ListItemButton component={Link} to='Objetivos'>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'Objetivos'} />
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
