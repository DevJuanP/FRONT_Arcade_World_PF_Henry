import React from 'react'
import { Box, Typography,Button } from '@mui/material'
import {useSelector } from 'react-redux'
import { DataGridPro } from '@mui/x-data-grid-pro';


function TableGames() {
 const games=useSelector((g)=>g.games)
 console.log(games)
 const rows = games.map((G)=>{
  
    return{
        id:G.id,
        Name:G.name,
        Price:'$/'+G.price,
        Plataforms:G.platforms[0],
        Genres:G.genres[0],
        Released:G.released,
        UpdatedAt:G.updatedAt
    }
 })
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
    flexDirection:'column',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundColor:'#546e7a'
 }
 const TitleBox={
   backgroundColor: '#37474f',
   borderRadius:'1em',
   padding:'1em',
   color:'white',
   margin:'1em'
 }
 const columns = [
   { field: 'Name' },
   { field: 'Price',
   headerName: 'Price',
     renderCell: (params) => (
       <div style={{ color: 'green' }}> 
         {params.row.Price}
       </div>
     ) },
   { field: 'Genres' },
   { field: 'Plataforms' },
   {field:'Released'},
   {field:'UpdatedAt'},
   {field:'Delete',
     headerName: 'Delete',
     renderCell: () => (
       <Button  variant="outlined" color="error">
         Delete
       </Button>
     )
   }
 ];
  
  return (
   <Box sx={BoxMain} gap={2}>
    <Box sx={TitleBox} >
      <Typography variant='h3' component={'h3'}>
       Table Games
      </Typography>
    </Box>
    <DataGridPro style={styleTable} rows={rows} columns={columns} pagination />
   </Box>
  )
}

export default TableGames