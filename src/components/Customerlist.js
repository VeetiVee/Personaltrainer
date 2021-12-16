import React, { useEffect, useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (car) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST', 
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg('Customer deleted succesfully')
                setOpen(true);
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }
}

const editCustomer = (url, updatedCar) => {
    fetch(url, {
        method: 'PUT',
        headers:  { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedCar)
    })
    .then(response => {
        if (response.ok) {
            fetchCustomers();
            setMsg('Customer edited succesfully')
            setOpen(true);
        }
        else {
            alert('Edit did not work');
        }
    })
    .catch(err => console.error(err))
}

const columns = [
    {field: 'firstname', sortable: true, filter: true},
    {field: 'lastname', sortable: true, filter: true},
    {field: 'streetaddress', sortable: true, filter: true},
    {field: 'postcode', sortable: true, filter: true, width: 120},
    {field: 'city', sortable: true, filter: true, width: 120},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true,  width: 120},
    {
        headerName: '',
        field: 'links.0.href',
        width: 120,
        cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} params={params} />
    },
    {
        headerName: '',
        field: 'links.0.href',
        sortable: false,
        filter: false,
        width: 120,
        cellRendererFramework: params =>
         <Button 
            size="small" 
            onClick={() => deleteCustomer(params.value)}
            color="error"
         >
            Delete
        </Button>
    }
]

    return(
        <React.Fragment>
            <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{height: 600, width: '80%', margin:'auto'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message={msg}
        />
        </React.Fragment>
    )
}

export default Customerlist;