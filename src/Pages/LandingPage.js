import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoBg from '../media/file.mp4'
import Button from '@mui/material/Button';
import axios from 'axios';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';


function LandingPage () {

    let navigate = useNavigate(); 

    const [posti, setPosti] = useState(-1);

    useEffect(() => {
        async function ciccio(){
            await axios.post("https://1elthz.deta.dev/getAvailableTickets").then(({data}) => {
                setPosti(data);
            })
            setTimeout(ciccio, 30000);
        }
        ciccio();
    }, [])

    return(

        <div>

            <div className="divvideo">

                <div className="overlay"></div>

                <video src={videoBg} autoPlay muted loop/>

                <div className="content">
                    <h1 className="titolo2"><strong>Festa</strong></h1>
                    <p style={{fontSize:'4vh', color:'white', marginTop:'-5vh'}}>Festa bella grossa dove ci si spacca.</p>

                    <div className="con2">
                        <p style={{fontSize:'3vh', color:'white', marginTop:'2vh'}}>Registrati per partecipare alla festa.</p>

                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Button onClick={() => {navigate("/register")}} style={{width:'10vw', minWidth:150}} color='error' variant="contained">REGISTRATI</Button>
                            <Button onClick={() => {navigate("/login")}} style={{width:'10vw', minWidth:150, marginTop:'2vh'}} color='error' variant="contained">LOGIN</Button>
                        </div>

                    </div>

                    <div className="con2" style={{height: '12vh', minHeight: 150}}>
                        <p style={{fontSize:'4vh', color:'white', marginTop:'1vh'}}>Posti rimanenti</p>
                        <p style={{fontSize:'6vh', color:'white', marginTop:'-2vh'}}><strong>{posti!=-1?posti==0?'SOLD OUT':posti:''}</strong></p>
                    </div>

                    <div className="arrow">
                        <KeyboardDoubleArrowDownIcon color="green" sx={{ fontSize: '8vh' }}></KeyboardDoubleArrowDownIcon>
                    </div>

                </div>

            </div>

            <div style={{marginBottom:'3vh', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                <h1 className="titolo"><strong>Info</strong></h1>

                <div style={{marginBottom:'3vh', textAlign:'center', display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
                    <div style={{marginRight:'1vw'}} className="box">
                        <h1 style={{fontSize:'3.5vh'}}>DATA</h1>
                        <p style={{fontSize:'4vh', color:'black', marginTop:'-1vh'}}>22/10/2022</p>
                    </div>
                    <div style={{marginLeft:'1vw'}} className="box">
                        <h1 style={{fontSize:'3.5vh'}}>PREZZO</h1>
                        <p style={{fontSize:'4vh', color:'black', marginTop:'-1vh'}}>€15/persona</p>
                    </div>
                </div>

                <div style={{marginBottom:'4vh', textAlign:'center', display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
                    <div style={{marginRight:'4vw'}} className="box">
                        <h1 style={{fontSize:'3.5vh'}}>DRESSCODE</h1>
                        <p style={{fontSize:'4vh', color:'black', marginTop:'-1vh'}}>X</p>
                    </div>
                    <div style={{marginLeft:'-2vw'}} className="box">
                        <h1 style={{fontSize:'3.5vh'}}>MAX POSTI</h1>
                        <p style={{fontSize:'4vh', color:'black', marginTop:'-1vh'}}>150</p>
                    </div>
                </div>

                <div className="box" style={{width:'40vw', minWidth:300}}>
                    <h1 style={{fontSize:'3.5vh'}}>DESCRIZIONE</h1>
                    <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>Festa con il costo di entrata di €15 a persona con free drink. Ci saranno barman, DJ e fotografo. Posti limitati (chi prima arriva meglio alloggia).</p>
                </div>

            </div>

            <div style={{marginTop:'6vh', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                <div className="footer">
                    <p style={{fontSize:'2vh', color:'black', marginTop:'-1vh'}}>Copyright © tutti i diritti riservati.</p>
                    <p style={{fontSize:'2vh', color:'black', marginTop:'-1vh'}}>Sito web realizzato da <a href="https://www.instagram.com/filippodivie/">Diviesti Filippo</a> e <a href="https://www.instagram.com/l_lucato3/">Lucato Leonardo</a>.</p>
                </div>
            </div>

            


            
            


        </div>
       

    )
}


export default LandingPage;