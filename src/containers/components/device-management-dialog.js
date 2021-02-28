import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  OutlinedInput,
  InputLabel,
  Typography,
  Switch,
  FormControlLabel
} from '@material-ui/core';

import { v4 as uuidv4 } from 'uuid';

const DeviceManagementDialog = (props) => {
  const {
    open,
    handleClose,
    isNew,
    device,
    setDevice,
    updateDevice,
    addDevice
  } = props;

  const [vendorHelperText, setVendorHelperText] = useState('');

  const [checkValidations, setCheckValidations] = useState(false);

  useEffect(() => {
    setCheckValidations(false);
    setVendorHelperText(isNew ? 'Required' : '');
  }, [open]);

  const onChangeVendor = (e) => {
    const value = e.target.value;
    setDevice((prevState) => ({
      ...prevState,
      vendor: value
    }));
    if (value === '') {
      setVendorHelperText('Required');
    } else {
      setVendorHelperText('')
    }
  };

  const onChangeStatus = (e) => {
    const value = e.target.checked;
    setDevice((prevState) => ({
      ...prevState,
      status: value ? 'online' : 'offline'
    }));
  };

  const handleSaveDevice = () => {
    setCheckValidations(true);
    if (vendorHelperText === '') {
      if (isNew) {
        const newDevice = {
          uid: uuidv4(),
          vendor: device.vendor,
          createdDate: new Date(),
          status: device.status
        }
        addDevice(newDevice);
      } else {
        updateDevice(device);
      }
      handleClose();
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth='sm'
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Device</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
          </DialogContentText> */}
        <InputLabel>
          <Typography variant="caption" display="block">
            Vendor *
          </Typography>
        </InputLabel>
        <OutlinedInput
          id="section-vendor-input"
          className="input-name"
          value={device?.vendor}
          error={checkValidations && vendorHelperText !== ''}
          onChange={(value) => {
            onChangeVendor(value);
          }}
        />
        {checkValidations && vendorHelperText !== '' ? (
          <p
            className="text-error"
          >
            {vendorHelperText}
          </p>
        ) : null}
        <InputLabel className="mt-3">
          <Typography variant="caption" display="block">
            Status
          </Typography>
        </InputLabel>
        <FormControlLabel
          control={
            <Switch
              checked={device.status === 'online'}
              onChange={onChangeStatus}
              color="primary"
              name="status"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label={`${device.status === 'online' ? 'Online' : 'Offline'}`}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleSaveDevice} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceManagementDialog;