import React from 'react'
 import { DataGridPro} from '@mui/x-data-grid-pro';
import { useSelector } from 'react-redux';
import { Box,Typography,Button} from '@mui/material';

function TableUser() {
  const user=useSelector((U)=>U.user)
  
  const rows = user.map((u)=>{
    return{
      id:u.id,
      name: u.name,
      lastname:u.lastname ,
      nickname: u.nickname,
      Email: u.Email,
    }
  })
  const columns=
   [
    {field:'name', headerName: 'Name', width: 160, editable: true},
    {field:'lastname'},
    {field:'nickname'},
    {field:'Email'},
    {field:'Detail',
    headerName: 'Detail',
    renderCell: () => (
      <Button  variant="outlined" color="primary">
       Detail
      </Button>
    )
  },{
    field:'Delete',
    headerName:'Delete',
    renderCell:()=>(
      <Button variant="outlined" color="error" >
      Delete
      </Button>
    )
  }
   ]
   const styleTable={
    color:'black',
    width:'98%',
    backgroundColor: '#90a4ae',
    border: 'none',
  
   }
   const BoxMain={
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#546e7a',
      flexDirection:'column',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      height: '100vh',
   }
   const TitleBox={
    backgroundColor: '#37474f',
    borderRadius:'1em',
    padding:'1em',
    color:'white',
    margin:'1em'
  }
  return (
    <Box sx={BoxMain} gap={2}>
    <Box sx={TitleBox} >
      <Typography variant='h3' component={'h3'}>
       Table  User
      </Typography>
    </Box>
    <DataGridPro style={styleTable} rows={rows} columns={columns}   pagination
        />
   </Box>
  )
}

export default TableUser

