import React, { useEffect, useState } from 'react';
import { serviceGetAllGateways, serviceDeleteGateway } from '../../api/gateways';

import '../../assets/gateways.css';

import {
  AppBar,
  Toolbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddIcon from '@material-ui/icons/Add';

import SkeletonGateways from './skeleton-gateways';
import GatewayManagementDialog from './gateway-management-dialog';
import ConfirmDeleteDialog from './confirm-delete-dialog';
import GatewayDetailsDialog from './gateway-details-dialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Gateways = (props) => {

  const [gateways, setGateways] = useState([]);
  const [loadingGateways, setLoadingGateways] = useState(true);
  // const [deletingGateway, setDeletingGateway] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEl, setOpenEl] = useState(null);

  const [openGatewayManagementDialog, setOpenGatewayManagementDialog] = useState(false);
  // const [openDeviceManagementDialog, setOpenDeviceManagementDialog] = useState(false);
  const [openGatewayDetailsDialog, setOpenGatewayDetailsDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const [isNew, setIsNew] = useState(false);
  const [currentGateway, setCurrentGateway] = useState({});

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [messageAlert, setMessageAlert] = useState('Error!');

  useEffect(() => {
    getAllGateways();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenEl(event.currentTarget.getAttribute('aria-controls'));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEl(null);
  };

  const handleOpenAlertSuccess = (message) => {
    setMessageAlert(message);
    setOpenAlertSuccess(true);
  };

  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertSuccess(false);
  };

  const handleOpenAlertError = (message) => {
    setMessageAlert(message);
    setOpenAlertError(true);
  };

  const handleCloseAlertError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertError(false);
  };

  const handleOpenGatewayManagementDialog = () => {
    setOpenGatewayManagementDialog(true);
  };

  const handleCloseGatewayManagementDialog = () => {
    setOpenGatewayManagementDialog(false);
  };

  // const handleOpenDeviceManagementDialog = () => {
  //   setOpenDeviceManagementDialog(true);
  // };

  // const handleCloseDeviceManagementDialog = () => {
  //   setOpenDeviceManagementDialog(false);
  // };

  const handleOpenGatewayDetailsDialog = () => {
    setOpenGatewayDetailsDialog(true);
  };

  const handleCloseGatewayDetailsDialog = () => {
    setOpenGatewayDetailsDialog(false);
  };

  const handleOpenConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const getAllGateways = () => {
    setLoadingGateways(true);
    serviceGetAllGateways()
      .then((response) => {
        console.log('response', response.data)
        if (response.data.error) {
          handleOpenAlertError(response.data.message);
        } else {
          setGateways(response.data.data);
        }
        setLoadingGateways(false);
      })
      .catch((error) => {
        handleOpenAlertError(error);
        setLoadingGateways(false);
      });
  };

  const onFinishSaveGateway = () => {
    handleCloseGatewayManagementDialog();
    getAllGateways();
    handleOpenAlertSuccess(isNew ? 'Gateway added successfuly!' : 'Gateway updated successfuly!');
  };

  const onDeleteGateway = () => {
    console.log('onDeleteGateway');
    // setDeletingGateway(true);
    serviceDeleteGateway(currentGateway.serial)
      .then((response) => {
        console.log('response', response.data)
        if (response.data.error) {
          handleOpenAlertError(response.data.message);
        } else {
          handleOpenAlertSuccess('Gateway deleted successfuly!');
        }
        // setDeletingGateway(false);
        getAllGateways();
      })
      .catch((error) => {
        handleOpenAlertError(error);
        // setDeletingGateway(false);
      });
  };

  return (
    <div className="container-fluid">
      <AppBar className="appBar">
        <Toolbar>
          <Typography variant="h6" className="title">
            Gateways
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <div className="row row-margin d-flex justify-content-center p-4">
        <Typography color="primary" variant="h3" gutterBottom>
          Gateways
        </Typography>
      </div> */}
      <div className="row row-margin root-main-view px-4">
        <TableContainer className="container row-padding" component={Paper}>
          {(!loadingGateways) ? (
            <div>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="serial"
                      align="left"
                      className="text-bold"
                    // style={{ minWidth: 200 }}
                    >
                      Serial
                  </TableCell>
                    <TableCell
                      key="name"
                      align="center"
                      className="text-bold"
                    // style={{ minWidth: 200 }}
                    >
                      Name
                  </TableCell>
                    <TableCell
                      key="ipv4"
                      align="center"
                      className="text-bold"
                    // style={{ minWidth: 200 }}
                    >
                      IPv4
                  </TableCell>
                    <TableCell
                      key="devices-count"
                      align="center"
                      className="text-bold"
                    // style={{ minWidth: 200 }}
                    >
                      Devices count
                  </TableCell>
                    <TableCell
                      key="actions"
                      align="center"
                    // style={{ minWidth: 50 }}
                    >

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    gateways ?.map((gateway, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={gateway.serial}>
                          <TableCell key={gateway.serial} align="left">
                            {gateway.serial}
                          </TableCell>
                          <TableCell key={`${index + '-' + gateway.name}`} align="center">
                            {gateway.name}
                          </TableCell>
                          <TableCell key={`${index + '-' + gateway.address}`} align="center">
                            {gateway.address}
                          </TableCell>
                          <TableCell key={`${index + '-' + gateway.devices.length}`} align="center">
                            {gateway.devices.length}
                          </TableCell>
                          <TableCell key={`${index + '-actions'}`} align="center">
                            <IconButton
                              className="p-0"
                              aria-label="more"
                              // aria-controls="long-menu"
                              aria-controls={index}
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                            <Menu
                              id={index}
                              anchorEl={anchorEl}
                              keepMounted
                              open={openEl == index}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setCurrentGateway(gateway);
                                  handleOpenGatewayDetailsDialog();
                                }}
                              >
                                <ListItemIcon className="icon_menu">
                                  <VisibilityIcon fontSize="small" />
                                </ListItemIcon>
                                Details
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setIsNew(false);
                                  setCurrentGateway(gateway);
                                  handleOpenGatewayManagementDialog();
                                }}
                              >
                                <ListItemIcon className="icon_menu">
                                  <EditIcon fontSize="small" />
                                </ListItemIcon>
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  setCurrentGateway(gateway);
                                  handleOpenConfirmDeleteDialog();
                                }}
                              >
                                <ListItemIcon className="icon_menu">
                                  <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
          ) : (
              <SkeletonGateways />
            )
          }
          {
            (gateways ?.length === 0 && !loadingGateways) &&
            <div className="container-empty">
              {/* <span className="table-empty"></span> */}
              <Typography variant="h6">
                Gateways list is empty.
              </Typography>
            </div>
          }
        </TableContainer>
      </div>
      {
        (!loadingGateways) &&
        (
          <div className="container row-padding">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className="savec mt-3"
              // startIcon={<AddIcon />}
              onClick={() => {
                setIsNew(true);
                setCurrentGateway({
                  serial: "",
                  name: "",
                  address: "",
                  devices: []
                });
                handleOpenGatewayManagementDialog();
              }}
            >
              Add
            </Button>
          </div>
        )
      }
      <GatewayManagementDialog
        open={openGatewayManagementDialog}
        handleClose={handleCloseGatewayManagementDialog}
        isNew={isNew}
        gateway={currentGateway}
        setGateway={setCurrentGateway}
        onFinish={onFinishSaveGateway}
      />
      <GatewayDetailsDialog
        open={openGatewayDetailsDialog}
        handleClose={handleCloseGatewayDetailsDialog}
        gateway={currentGateway}
      />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        handleClose={handleCloseConfirmDeleteDialog}
        message="Are you sure you want to delete this gateway?"
        handleDelete={onDeleteGateway}
      />
      <Snackbar open={openAlertSuccess} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success">
          {messageAlert}
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertError} autoHideDuration={3000} onClose={handleCloseAlertError}>
        <Alert onClose={handleCloseAlertError} severity="error">
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  )
};

export default Gateways;