import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';




function InfoFesta () {

    let navigate = useNavigate();

    const columns = [
        { field: 'nome', headerName: 'NOME', width: 130 },
        { field: 'cognome', headerName: 'COGNOME', width: 130 },
        { field: 'pagamento', headerName: 'PAGAMENTO', width: 130 },
        { field: 'presenza', headerName: 'PRESENZA', width: 130 },
        { field: 'id', headerName: 'ID', width: 70},
    ];


    const [righe, setRighe] = useState([]);

    async function riempiTabella(){
        await axios.post("https://1elthz.deta.dev/getAllInfo", {"token":sessionStorage.getItem("token")}).then(({data}) => {
            if(data['result'] == 'success'){
                setRighe(data['info']);
                setInfo(data['info2']);
                setCount(data['count']);
            }
            else{
                alert('errore')
            }
        })
    }


    useEffect(() => {
        if (!sessionStorage.getItem('token')){
            navigate('/login')
        }

        
        async function ciccio(){
            
            await axios.post("https://1elthz.deta.dev/checkAdminToken", {"token":sessionStorage.getItem("token")}).then(({data}) => {
                if(data['result'] == 'error'){
                    navigate('/login')
                }
            })
            
        }
        ciccio();

        

        riempiTabella();

    }, [])


    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        bgcolor: 'white',
        borderRadius:5,
        boxShadow: 24,
        p: '4vh',
        color: 'black',
        minWidth: 200
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [selectionModel, setSelectionModel] = React.useState([]);

    const [info, setInfo] = React.useState([]);

    const [count, setCount] = React.useState([]);

    const deleteFunc = async event => {
        handleClose();
        event.preventDefault();
        if(selectionModel.length == 0){
            selError();
        }
        else{
            await axios.post("https://1elthz.deta.dev/deleteUser", {"users": selectionModel, "admin_token":sessionStorage.getItem("token")}).then(({data}) => {
                if(data['result'] == 'success'){
                    riempiTabella();
                }
                else{
                    alert('ERRORE')
                }
            })
        }
    }

    function updateProgressBar(progressBar, value) {
        value = Math.round(value);
        progressBar.querySelector(".progress__fill").style.width = `${value}%`;
        progressBar.querySelector(".progress__text").textContent = `${value}%`;
    }

    useEffect(() => {

        const myProgressBar = document.querySelector(".progress");
        const myProgressBar2 = document.querySelector(".progress2");
      
        /* Example */
        updateProgressBar(myProgressBar, info[0]);
        updateProgressBar(myProgressBar2, info[1]);

    
    }, [info])
      
    


    return(
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', marginTop: 20}}>

            <div className="subtitolo2">
                <p style={{fontWeight: 600, fontSize:'5vh'}}>Tabella partecipanti</p>
                <p style={{marginTop:'-3vh'}}>Lista dei partecipanti con le relative informazioni.</p>
            </div>

            <div className="box">
                
                <div className="bardivcon">
                    <div className="bardiv1">
                        <p className="pmt">Utenti che hanno pagato ({count[0]}/{count[2]})</p>

                        <div className="progress">
                            <div className="progress__fill"></div>
                            <span className="progress__text">0%</span>
                        </div>
                    </div>

                    <div className="bardiv2">
                        <p className="pmt">Utenti che sono entrati ({count[1]}/{count[2]})</p>

                        <div className="progress2">
                            <div className="progress__fill"></div>
                            <span className="progress__text">0%</span>
                        </div>
                    </div>
                </div>
                

                <div style={{ height: 520, width: '35vw', minWidth: 300, marginTop: '4vh' }}>
                    <DataGrid rows={righe} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection onSelectionModelChange={(newSelectionModel) => {setSelectionModel(newSelectionModel);}} />
                </div>

                <Button startIcon={<DeleteIcon color="red"/>} style={{marginTop:40}} onClick={handleOpen} variant="outlined" color="error">Elimina persone selezionate</Button>

            </div>
            <div style={{marginTop: 20}}>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">ELIMINAZIONE</Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>Sei sicuro di voler eliminare le persone selezionate?</Typography>
                        <Button onClick={deleteFunc} sx={{ mt: 2 }} variant="contained">SI</Button>
                    </Box>
                </Modal>
            </div>

        </div>
    )
}

function selError(){
    Swal.fire({
        title:'NESSUN UTENTE SELEZIONATO',
        icon:'error',
        showConfirmButton: false,
        timer:2000
    })
}

export default InfoFesta;