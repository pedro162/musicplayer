import React from 'react';
import {getVenda, findeOneVenda} from '../Database/Dao/VendaDao.js'
import {formataCalcCod, formatMoney} from '../Components/Utils/Funcoes/index.js'


export const DataContex = React.createContext();

export const DataStorange = ({children})=>{

    const [loginUser, setLoginUser]                 = React.useState(null)
    const [dataUser, setDataUser] 	                = React.useState(null)
    const [idVenda, setIdVenda]                     = React.useState(null)
    const [vrVenda, setVrVenda]                     = React.useState(null)
    const [dataVenda, setDataVenda]                 = React.useState(null)
    const [idPessoaVendedor, setIdPessoaVendedor]   = React.useState(1)
    const [nrVendedor, setNrVendedor]               = React.useState(12)
    const [idUsuario, setIdUsuario]                 = React.useState(1)


    const userLogout = ()=>{
        
      
        try{

        }catch(er){
            console.log(er)
        }

    }

    const getUser = async ()=>{
       
        try{

          

            

        }catch(er){
            console.log(er)
        }
    }

    const userLogin = async (username, password)=>{
        try{
                      
                   

        }catch(er){
            console.log(er)
        }
    }

    const atualizaDataVenda = async ()=>{
    	let dataRetornoVenda = await findeOneVenda({id:idVenda})
    	console.log('---------------------- venda iniciada ---------------------')
    	console.log(dataRetornoVenda)
    	console.log('---------------------- venda iniciada ---------------------')
    	setDataVenda(dataRetornoVenda)

    	let vrVen = dataRetornoVenda && dataRetornoVenda.hasOwnProperty('vr_liquido') ? dataRetornoVenda.vr_liquido : 0
    	vrVen = formatMoney(vrVen);
    	setVrVenda(vrVen)
    }

    /*
     const requestToken = async() =>{
       
           const {url, options} = TOKEN_POST({
                'grant_type':'password',
                'client_id': CLIENT_ID,
                'client_secret':CLIENT_SECRET,
                'username':'admin@gmail.com',
                'password':'123456'
             });


            const {response, json} = await request(url, options);

            
        }

    */
    const dataToContext = {
    	atualizaDataVenda,setDataVenda,idVenda, vrVenda,setIdVenda,setVrVenda,userLogin, getUser,userLogout, loginUser, setLoginUser, dataUser, setDataUser,
        idPessoaVendedor, setIdPessoaVendedor, nrVendedor, setNrVendedor, idUsuario, setIdUsuario

    }

    return(
        <DataContex.Provider value={{...dataToContext}} >
            {children}
        </DataContex.Provider>
    )
}
