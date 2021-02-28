import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar
} from '@material-ui/core';

const GatewayDetailsDialog = (props) => {

  const {
    open,
    handleClose,
    gateway
  } = props;

  return (
    <Dialog
      fullWidth={true}
      maxWidth='md'
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title-section-dialog" id="alert-dialog-title">{"Details"}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid
          className="p-4"
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12} sm={5}>
            <Typography variant="button" display="block" gutterBottom>
              Data
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  className="list-item-text"
                  secondary="Serial Number:"
                />
                <ListItemText
                  className="list-item-text"
                  primary={gateway.serial}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  className="list-item-text"
                  secondary="Name:"
                />
                <ListItemText
                  className="list-item-text"
                  primary={gateway.name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  className="list-item-text"
                  secondary="IPv4 address:"
                />
                <ListItemText
                  className="list-item-text"
                  primary={gateway.address}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="button" display="block" gutterBottom>
              Devices
            </Typography>
            {gateway ?.devices ?.length !== 0
              ? (
                <TableContainer>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-bold">Vendor</TableCell>
                        <TableCell className="text-bold" align="left">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {gateway ?.devices ?.map((device) => (
                        <TableRow key={device.uid}>
                          <TableCell component="th" scope="row">
                            {device.vendor}
                          </TableCell>
                          <TableCell align="left">
                            <div className="d-flex align-items-center">
                              <Avatar
                                className={`circle-${device.status}`}
                              >
                                {' '}
                              </Avatar>
                              {device.status}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="subtitle1" display="block" gutterBottom>
                  The device list is empty.
                </Typography>
              )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GatewayDetailsDialog;