import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider
} from '@material-ui/core';

const ConfirmDeleteDialog = (props) => {

  const {
    open,
    handleClose,
    message,
    handleDelete,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title-section-dialog" id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
          </Button>
        <Button className="text-alert" onClick={() => {
          handleDelete();
          handleClose();
        }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;