import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import QRCode from "react-qr-code";


function Profile () {

    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [pagamento, setPagamento] = useState(0);

    let navigate = useNavigate();    

    useEffect(() => {
        async function ciccio(){
            if(sessionStorage.getItem("token")){
                await axios.post("https://1elthz.deta.dev/getUserInfo", {"token":sessionStorage.getItem("token")}).then(({data}) => {
                setNome(data['result'][0]);
                setCognome(data['result'][1]);
                setPagamento(data['result'][2]);
            })
            }else{
            navigate("/login");
        }
            
        }
        ciccio();
    }, [])

    return(
        <div>

            <Box component='form' sx={{marginTop: '2hv', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

                <div className="tit">
                    <h1 className="titoloProf">Ciao {nome}, pronto per la festa?</h1>
                </div>

                <div className="box">

                    <div className="code">
                        <div className="codediv">
                            <div className="tit">
                                <p style={{fontSize:'3vh'}}><strong>QRCode : </strong></p>
                            </div>
                            {sessionStorage.getItem("token")?<QRCode value={sessionStorage.getItem("token")}/>:''}
                        </div>
                    </div>

                    <div>
                        <div className="subtit">
                            <p style={{fontSize:'3vh'}}><strong>{nome}&nbsp;{cognome}</strong></p>
                        </div>
                        <div className="ciaobello">
                            <p style={{fontSize:'3vh'}}><strong>Stato pagamento : &nbsp;</strong></p>
                            <p style={{fontSize:'3vh', color:pagamento==0?'red':'green'}}>{pagamento==0?'non pagato':'pagato'}</p>
                        </div>
                    </div>

                </div>

                <Button onClick={() => {navigate("/login")}} className="logoutBtn" variant="outlined" color="error">Logout</Button>

            </Box>

        </div>
    )
}

export default Profile;