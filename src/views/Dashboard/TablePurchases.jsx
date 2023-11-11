import React,{useEffect,useState} from 'react'
import { DataGridPro} from '@mui/x-data-grid-pro';
import { Box,Typography,Button} from '@mui/material';
import Modal from 'react-modal'
import {useDispatch,useSelector}from 'react-redux'
import { GetPuchase } from '../../redux/actions';



function TablePurchases() {
  const Dispatch=useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(()=>{
   Dispatch(GetPuchase())
  },[])
  const purchase=useSelector((P)=>P.Purchase)
  const rows = purchase.map((p)=>{
    const videoGamesNames = p.Videogames.map(game => game.name).join(', ');
      return{
        id:p.purchaseId,
        amount:p.amount,
        paymentMethod:p.paymentMethod,
        date:p.date,
        Hour:p.hour,
      Nameuser:p.username,
      Nickname:p.nickname,
     Email:p.Email,
     videogame:videoGamesNames
      }
    })
    const customStyles = {
      content: {
      width: '80%', // Puedes ajustar este valor según tus necesidades
      height: '80vh', // Otra opción es utilizar porcentaje de la altura de la ventana
      backdropFilter: 'blur(8px)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Cambiar el color de fondo del modal
      },
      overlay: {
        backgroundColor:' rgba(255, 255, 255, 0.10)', // Cambiar el color de fondo del overlay
      },
    };
  const columns=[
    {field:'id'},
    {field:'amount',headerName:'Amount'},
    {field:'paymentMethod',headerName:'Payment Method'},
    {field:'date',headerName:'Date'},
    {field:'Hour'},
    {field:'Nameuser'},
    {field:'Nickname'},
    {field:'Email'},
    {field:'videogame',headerName:'Videogame'},
    {field:'detail',headerName:'Detail', renderCell: () => {
      
      return(
      <div>
      <Button onClick={openModal}>Abrir Modal</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo de Modal"
        style={customStyles}
      >
        <h2>Ejemplo de Modal</h2>
        <p>Contenido del modal...</p>
        <Button onClick={closeModal}>Cerrar Modal</Button>
      </Modal>
    </div>
    )
  }}
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