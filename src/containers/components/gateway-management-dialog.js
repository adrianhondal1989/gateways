import React, { useState, useEffect } from 'react';

import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  OutlinedInput,
  InputLabel,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import * as moment from 'moment';

import '../../assets/gateway-management-dialog.css';
import { serviceUpdateGateway, serviceAddGateway } from '../../api/gateways';

import CloseIcon from '@material-ui/icons/Close';

import DeviceManagementDialog from './device-management-dialog';
import ConfirmDeleteDialog from './confirm-delete-dialog';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GatewayManagementDialog = (props) => {
  const {
    open,
    handleClose,
    isNew,
    gateway,
    setGateway,
    onFinish
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEl, setOpenEl] = useState(null);

  const [serialHelperText, setSerialHelperText] = useState('');
  const [nameHelperText, setNameHelperText] = useState('');
  const [addressHelperText, setAddressHelperText] = useState('');

  const [checkValidations, setCheckValidations] = useState(false);

  const [openAlertError, setOpenAlertError] = useState(false);
  const [messageAlert, setMessageAlert] = useState('Error!');

  const [isNewDevice, setIsNewDevice] = useState(false);
  const [currentDevice, setCurrentDevice] = useState({});

  const [openDeviceManagementDialog, setOpenDeviceManagementDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  useEffect(() => {
    setCheckValidations(false);
    setSerialHelperText(isNew ? 'Required' : '');
    setNameHelperText(isNew ? 'Required' : '');
    setAddressHelperText(isNew ? 'Required' : '');
  }, [open]);

  const handleOpenDeviceManagementDialog = () => {
    setOpenDeviceManagementDialog(true);
  };

  const handleCloseDeviceManagementDialog = () => {
    setOpenDeviceManagementDialog(false);
  };

  const handleOpenConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenEl(event.currentTarget.getAttribute('aria-controls'));
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenEl(null);
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

  const onChangeSerial = (e) => {
    const value = e.target.value;
    setGateway((prevState) => ({
      ...prevState,
      serial: value
    }));
    if (value === '') {
      setSerialHelperText('Required');
    } else {
      setSerialHelperText('')
    }
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setGateway((prevState) => ({
      ...prevState,
      name: value
    }));
    if (value === '') {
      setNameHelperText('Required');
    } else {
      setNameHelperText('')
    }
  };

  const onChangeAddress = (e) => {
    const value = e.target.value;
    setGateway((prevState) => ({
      ...prevState,
      address: value
    }));
    if (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(value)) {
      setAddressHelperText('Invalid IPV4 address.');
    } else {
      setAddressHelperText('')
    }
  };

  const onUpdateDevice = () => {
    let devicesTemp = gateway.devices.map((dev) => {
      if (dev.uid === currentDevice.uid) {
        return currentDevice;
      } else {
        return dev;
      }
    });
    setGateway((prevState) => ({
      ...prevState,
      devices: devicesTemp
    }));
  };

  const onAddDevice = (device) => {
    let devicesTemp = Array.from(new Set(gateway.devices));
    devicesTemp.push(device);
    setGateway((prevState) => ({
      ...prevState,
      devices: devicesTemp
    }));
  };

  const onDeleteDevice = () => {
    let devicesTemp = Array.from(new Set(gateway.devices));
    devicesTemp = devicesTemp.filter(dev => dev.uid !== currentDevice.uid);
    setGateway((prevState) => ({
      ...prevState,
      devices: devicesTemp
    }));
  };

  const handleSaveGateway = () => {
    setCheckValidations(true);
    if (serialHelperText === '' && nameHelperText === '' && addressHelperText === '') {
      if (isNew) {
        serviceAddGateway(gateway)
          .then((response) => {
            if (response.data.error) {
              handleOpenAlertError(response.data.message);
            } else {
              // console.log(response.data.data);
              onFinish();
            }
          })
          .catch((error) => {
            handleOpenAlertError(error);
          });
      } else {
        serviceUpdateGateway(gateway)
          .then((response) => {
            if (response.data.error) {
              handleOpenAlertError(response.data.message);
            } else {
              // console.log(response.data.data);
              onFinish();
            }
          })
          .catch((error) => {
            handleOpenAlertError(error);
          });
      }
    }
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        handleClose();
      }}
      TransitionComponent={Transition}
    >
      <AppBar className="appBar">
        <Toolbar>
          <IconButton edge="start" color="inherit"
            onClick={() => {
              handleClose()
            }}
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            {`${isNew ? "New Gateway" : "Edit Gateway"}`}
          </Typography>
          <Button color="inherit" onClick={handleSaveGateway}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="root-dialog px-2">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper>
              <div className="paper-header-dialog">
                <Typography variant="h6" gutterBottom>
                  Gateway
                </Typography>
                <Divider className="paper-divider" />
                <div className="paper-content-dialog">
                  <InputLabel>
                    <Typography variant="caption" display="block">
                      Serial *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="section-serial-input"
                    className="input-name"
                    disabled={!isNew}
                    value={gateway ?.serial}
                    error={checkValidations && serialHelperText !== ''}
                    onChange={(value) => {
                      onChangeSerial(value);
                    }}
                  />
                  {checkValidations && serialHelperText !== '' ? (
                    <p
                      className="text-error"
                    >
                      {serialHelperText}
                    </p>
                  ) : null}
                  <InputLabel className="mt-3">
                    <Typography variant="caption" display="block">
                      Name *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="section-name-input"
                    className="input-name"
                    value={gateway ?.name}
                    error={checkValidations && nameHelperText !== ''}
                    onChange={(value) => {
                      onChangeName(value);
                    }}
                  />
                  {checkValidations && nameHelperText !== '' ? (
                    <p
                      className="text-error"
                    >
                      {nameHelperText}
                    </p>
                  ) : null}
                  <InputLabel className="mt-3">
                    <Typography variant="caption" display="block">
                      Address *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="section-address-input"
                    className="input-name outlined-input"
                    value={gateway ?.address}
                    error={checkValidations && addressHelperText !== ''}
                    onChange={(value) => {
                      onChangeAddress(value);
                    }}
                  />
                  {checkValidations && addressHelperText !== '' ? (
                    <p
                      className="text-error"
                    >
                      {addressHelperText}
                    </p>
                  ) : null}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <div className="paper-header-dialog">
                <Typography variant="h6" gutterBottom>
                  Devices
                </Typography>
                <Divider className="paper-divider" />
                <TableContainer className="container row-padding mt-4" component={Paper}>
                  <div>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            key="vendor"
                            align="left"
                            className="text-bold"
                          // style={{ minWidth: 200 }}
                          >
                            Vendor
                            </TableCell>
                          <TableCell
                            key="name"
                            align="center"
                            className="text-bold"
                          // style={{ minWidth: 200 }}
                          >
                            Created at
                          </TableCell>
                          <TableCell
                            key="ipv4"
                            align="center"
                            className="text-bold"
                          // style={{ minWidth: 200 }}
                          >
                            Status
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
                          gateway ?.devices ?.map((device, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={device.uid}>
                                <TableCell key={`${index + '-' + device.vendor}`} align="left">
                                  {device.vendor}
                                </TableCell>
                                <TableCell key={`${index + '-' + device.createdDate}`} align="center">
                                  {moment(device.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                                </TableCell>
                                <TableCell key={`${index + '-' + device.status}`} align="center">
                                  <div className="d-flex justify-content-center align-items-center">
                                    <Avatar
                                      className={`circle-${device.status}`}
                                    >
                                      {' '}
                                    </Avatar>
                                    {device.status}
                                  </div>
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
                                    onClose={handleCloseMenu}
                                  >
                                    <MenuItem
                                      onClick={() => {
                                        handleCloseMenu()
                                        setIsNewDevice(false);
                                        setCurrentDevice(device);
                                        handleOpenDeviceManagementDialog();
                                      }}
                                    >
                                      <ListItemIcon className="icon_menu">
                                        <EditIcon fontSize="small" />
                                      </ListItemIcon>
                                      Edit
                                      </MenuItem>
                                    <MenuItem
                                      onClick={() => {
                                        handleCloseMenu()
                                        setCurrentDevice(device);
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
                  {
                    gateway ?.devices ?.length === 0 &&
                      <div className="container-empty">
                        {/* <span className="table-empty"></span> */}
                        <Typography variant="h6">
                          The device list is empty.
                        </Typography>
                      </div>
                  }
                </TableContainer>
                <div className="container row-padding">
                  {gateway ?.devices ?.length < 10
                    ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className="savec mt-3"
                        // startIcon={<AddIcon />}
                        onClick={() => {
                          setIsNewDevice(true);
                          setCurrentDevice({
                            vendor: "",
                            status: "offline"
                          });
                          handleOpenDeviceManagementDialog();
                        }}
                      >
                        Add
                      </Button>
                    )
                    : (
                      <Typography className="info-limit-text mt-3" variant="body2" display="block" gutterBottom>
                        This gateway already has the device limit.
                      </Typography>
                    )
                  }
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Snackbar open={openAlertError} autoHideDuration={3000} onClose={handleCloseAlertError}>
        <Alert onClose={handleCloseAlertError} severity="error">
          {messageAlert}
        </Alert>
      </Snackbar>
      <DeviceManagementDialog
        open={openDeviceManagementDialog}
        handleClose={handleCloseDeviceManagementDialog}
        isNew={isNewDevice}
        device={currentDevice}
        setDevice={setCurrentDevice}
        updateDevice={onUpdateDevice}
        addDevice={onAddDevice}
      />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        handleClose={handleCloseConfirmDeleteDialog}
        message="Are you sure you want to delete this device?"
        handleDelete={onDeleteDevice}
      />
    </Dialog>
  );
};

export default GatewayManagementDialog;