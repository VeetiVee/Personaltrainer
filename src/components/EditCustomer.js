import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCustomer(props) {
const [open, setOpen] = useState(false);
const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
})

  const handleClickOpen = () => {
    setCustomer({
        firstname: props.params.data.firstname,
        lastname: props.params.data.lastname,
        streetaddress: props.params.data.streetaddress,
        postcode: props.params.data.postcode,
        city: props.params.data.city,
        email: props.params.data.email,
        phone: props.params.data.phone,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      props.editCustomer(props.params.value, customer);
      handleClose();
  }

  const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
               name="firstname"
               brand={customer.firstname}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Firstname"
               fullWidth
               variant="standard"
             />
              <TextField
               name="lastname"
               brand={customer.lastname}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Lastname"
               fullWidth
               variant="standard"
             />
              <TextField
               name="streetaddress"
               brand={customer.streetaddress}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Streetaddress"
               fullWidth
               variant="standard"
             />
              <TextField
               name="postcode"
               brand={customer.postcode}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Postcode"
               fullWidth
               variant="standard"
             />
              <TextField
               name="city"
               brand={customer.city}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="City"
               fullWidth
               variant="standard"
             />
              <TextField
               name="email"
               brand={customer.email}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Email"
               fullWidth
               variant="standard"
             />
             <TextField
               name="phone"
               brand={customer.phone}
               onChange={inputChanged}
               margin="dense"
               id="name"
               label="Phone"
               fullWidth
               variant="standard"
             />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCustomer;