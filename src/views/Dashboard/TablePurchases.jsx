import React from 'react'
import { DataGridPro} from '@mui/x-data-grid-pro';
import { Box,Typography} from '@mui/material';
const purchased= [
  {
    purchaseId: '52c3c42b-762d-4874-be32-b9509b49a6c1',
    amount: 104.98,
    paymentMethod: 'stripe',
    date: '2023-11-09',
    Hour:'12:56',
    Nameuser:'pepe',
    Nickname:'theApha',
    Email:'pepe@gmail.com',
    Videogames: [
      {
        GameId: 'a3216861-9b49-4eca-887b-63df7245d047',
        name: 'Half-Life 2: Deathmatch',
          plataforms:['',''],
          genero:['','']

      },
      {
        GameId: '47b14155-3335-4d8f-85ac-2a88884d2eeb',
        name: 'Dark Souls III',
          plataforms:['',''],
          genero:['','']
      }
    ]
  }
  ]

function TablePurchases() {
  
  const rows = purchased.map((p)=>{
    const videoGamesNames = p.Videogames.map(game => game.name).join(', ');

      return{
        id:p.purchaseId,
        amount:p.amount,
        paymentMethod:p.paymentMethod,
        date:p.date,
        Hour:p.Hour,
      Nameuser:p.Nameuser,
      Nickname:p.Nickname,
     Email:p.Email,
     videogame:videoGamesNames
      }
    })
  const columns=[
    {field:'id'},
    {field:'amount'},
    {field:'paymentMethod'},
    {field:'date'},
    {field:'Hour'},
    {field:'Nameuser'},
    {field:'Nickname'},
    {field:'Email'},
    {field:'videogame'}
   ]
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
   const styleTable={
  color:'black',
  width:'98%',
  backgroundColor: '#90a4ae',
  border: 'none',

 }
  return (
    <Box sx={BoxMain}  gap={2}>
     <Box sx={TitleBox} >
      <Typography variant='h3' component={'h3'}>
       Table Purchased
      </Typography>
    </Box>
    <DataGridPro style={styleTable} rows={rows} columns={columns} pagination />
   </Box>
  )
}

export default TablePurchases