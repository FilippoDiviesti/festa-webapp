import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoBg from '../media/file.mp4'
import Button from '@mui/material/Button';
import axios from 'axios';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import logo from '../media/logo.png';






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



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

// <h1 className="titolo2"><strong>LED PARTY</strong></h1>

    return(

        <div>

            <div className="divvideo">

                <div className="overlay"></div>

                <video src={videoBg} autoPlay muted loop/>

                <div className="content">

                    <img src={logo} width={'375vw'} height={'300vh'} style={{marginTop:'8vh', borderRadius:'10%'}}/>

                    <div className="con2">
                        <p style={{fontSize:'3vh', color:'white', marginTop:'1vh'}}>Registrati per partecipare alla festa.</p>

                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Button onClick={() => {navigate("/register")}} style={{width:'10vw', minWidth:150}} color='error' variant="contained">REGISTRATI</Button>
                            <Button onClick={() => {navigate("/login")}} style={{width:'10vw', minWidth:150, marginTop:'2vh'}} color='error' variant="contained">LOGIN</Button>
                        </div>

                    </div>

                    <div className="con2" style={{height: '12vh', minHeight: 150}}>
                        <p style={{fontSize:'4vh', color:'white', marginTop:'1vh'}}>Posti rimanenti</p>
                        <p style={{fontSize:'6vh', color:'white', marginTop:'-2vh'}}><strong>{posti!=-1?posti==0?'SOLD OUT':posti:''}</strong></p>
                    </div>

                </div>

            </div>

            <div style={{marginBottom:'3vh', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                <h1 className="titolo"><strong>Info</strong></h1>

                <Box sx={{ width: '54vh' }}>
                    <Grid container spacing={3}>
                        <Grid xs={6} md={6}>
                            <Item>
                                <h1 style={{fontSize:'3.5vh'}}>DATA</h1>
                                <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>22/10/2022</p>
                            </Item>
                        </Grid>
                        <Grid xs={6} md={6}>
                            <Item>
                                <h1 style={{fontSize:'3.5vh'}}>PREZZO</h1>
                                <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>€15/persona</p>
                            </Item>
                        </Grid>
                        <Grid xs={6} md={6}>
                            <Item>
                                <h1 style={{fontSize:'3.5vh'}}>DRESSCODE</h1>
                                <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>No</p>
                            </Item>
                        </Grid>
                        <Grid xs={6} md={6}>
                            <Item>
                                <h1 style={{fontSize:'3.5vh'}}>MAX POSTI</h1>
                                <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>150</p>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>

                <div className="box" style={{width:'40vw', minWidth:300, marginTop:'4vh'}}>
                    <h1 style={{fontSize:'3.5vh'}}>DESCRIZIONE</h1>
                    <p style={{fontSize:'3vh', color:'black', marginTop:'-1vh'}}>Festa con il costo di entrata di €15 a persona con free drink. Ci saranno barman, DJ e fotografo. Posti limitati (chi prima arriva meglio alloggia).</p>
                </div>

                <div className="box" style={{width:'40vw', minWidth:300, marginTop:'4vh'}}>
                    <h1 style={{fontSize:'3.5vh'}}>POSIZIONE</h1>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.2704709642567!2d12.075461315418181!3d45.76576952129115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477924d0b937f8ff%3A0x4fe40153b052b9e7!2sBabylandia%20Montebelluna!5e0!3m2!1sit!2sit!4v1662726380107!5m2!1sit!2sit"
                        frameBorder="0"
                        style={{ border: 0, width:'40vw', height:'40vh', minWidth:300 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />

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