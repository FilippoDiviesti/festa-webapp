import React, {Component} from "react";
import QrReader from 'react-qr-scanner';
import QRCode from "react-qr-code";
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2'



class QRContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result:null, 
            nome:'*',
            cognome:'*',
            pagamento:0,
            last:'',
            presenza:0,
            open:false
        }
        this.handleScan = this.handleScan.bind(this)
    }
    
    handleScan(data){

        if(data && data['text']!=this.state.last){

            this.setState({
                result:data['text'],
                last:data['text'],
                open:false,
                nome:'*',
                cognome:'*',
                pagamento:0,
                presenza:0
            }, async () => {
                await axios.post("https://1elthz.deta.dev/getUserInfo", {"token":data['text']}).then(({data}) => {
                    if(data['result'] != null){
                        this.setState({nome:data['result'][0], cognome:data['result'][1], pagamento:data['result'][2], presenza:data['result'][3], open:true})
                    }
                    else{
                        codeError();
                    }
                })
            })

        }
        
    }
    handleError(err){
        console.error(err);
    }
    render(){
        const approvePayment = async () => {
            await axios.post("https://1elthz.deta.dev/approvePayment", {"nome":this.state.nome, "cognome":this.state.cognome, "admin_token":sessionStorage.getItem("token")}).then(({data}) => {
                  if (data['result'] == 'success'){
                    this.setState({pagamento:1})
                  }  
            })
        }
        const approveEntry = async () => {
            await axios.post("https://1elthz.deta.dev/approveEntry", {"nome":this.state.nome, "cognome":this.state.cognome, "admin_token":sessionStorage.getItem("token")}).then(({data}) => {
                  if (data['result'] == 'success'){
                    this.setState({presenza:1})
                  }  
            })
        }
        const previewstyle = {
            height:'40vh', wight:'40vw', display:'flex', justifyContent:'center', borderRadius:'5%'
        }
        const camStyle = {
            display:'flex', justifyContent:'center', marginTop:'-50px'
        }
        const textStyle = {
            fontSize:'30px', textAlign:'center', marginTop:'-50px'
        }




        return(
            <React.Fragment>
                <div style={camStyle}>
                    <QrReader constraints={window.innerWidth > 768 ? undefined : {video: {facingMode: { exact: 'environment' }}}} delay = {100} style={previewstyle} onError = {this.handleError} onScan={this.handleScan} />
                </div>

                

                <Collapse style={{marginTop:'2vh'}} in={this.state.open}>

                    <div className="box">
                        
                        <Box component='form' sx={{marginTop: -2, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

                            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div>
                                    {this.state.pagamento==0?this.state.result?<Button onClick={approvePayment} variant="outlined">APPROVA PAGAMENTO</Button>:<Button disabled onClick={approvePayment} variant="outlined">APPROVA PAGAMENTO</Button>:<p style={{fontSize:'3vh', color:'green'}}>Ha già pagato</p>}
                                </div>
                                <div style={{marginTop: 10}}>
                                    {this.state.presenza==0?this.state.result?<Button onClick={approveEntry}variant="outlined">APPROVA ENTRATA</Button>:<Button disabled onClick={approveEntry}variant="outlined">APPROVA ENTRATA</Button>:'È GIÀ ENTRATO'}
                                </div>     
                            </div>

                            <div className="code">
                                <div className="codediv">
                                    <div className="tit">
                                        <p style={{fontSize:'20px'}}><strong>QRCode:</strong></p>
                                    </div>
                                    {this.state.result?<QRCode value={this.state.result}/>:''}
                                </div>
                            </div>

                        </Box>

                        <div className="subtit">
                            <p style={{fontSize:'3vh'}}><strong>{this.state.nome}&nbsp;{this.state.cognome}</strong></p>
                        </div>

                    </div>
                    
                </Collapse>
        
                <div style={{marginBottom: 20, marginTop: 20, padding:10}}>
                    <Link style={{textDecoration:'none', color:'blu'}} to={{pathname:'/infoFesta'}}><InfoIcon sx={{ fontSize: 40, color: '#4fb5f1' }}></InfoIcon></Link>
                </div>

            </React.Fragment>
        )

    }
}

function codeError(){
    Swal.fire({
        title:'QRCODE NON VALIDO',
        icon:'error',
        showConfirmButton: false,
        timer:2000
    })
}

export default QRContainer;