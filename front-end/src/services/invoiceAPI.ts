import { GLOBAL } from "@/config/global"
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {


    async getNumberClient(){
       
        const req = await fetch(`${GLOBAL.BASE_URL}invoice/retrieve-number-client`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        const json = await req.json()

        return json
        

    },

    async getAllInvoices(numeroCliente?: string, mesReferencia?: string){

        const req = await fetch(`${GLOBAL.BASE_URL}invoice/retrieve-all?numeroCliente=${numeroCliente? numeroCliente : ''}&mesReferencia=${mesReferencia? mesReferencia : ''}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        const json = await req.json()

        return json
    }
    

}