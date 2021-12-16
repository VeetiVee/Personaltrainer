import React, { useEffect, useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        //.then(data => setTrainings(data.links.2.href))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg('Training deleted succesfully')
                setOpen(true);
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }
}

    const columns = [
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer', sortable: true, filter: true},
        {
            headerName: '',
            field: 'id',
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params =>
             <Button 
                size="small" 
                onClick={() => deleteTraining(params.value)}
                color="error"
             >
                Delete
            </Button>
        }
      
    ]

    return(
        <React.Fragment>
        <div className="ag-theme-material" style={{height: 600, width: '80%', margin:'auto'}}>
            <AgGridReact
                rowData={trainings}
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

export default Traininglist;