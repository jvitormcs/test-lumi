import { FaturaInputDatabase } from "../dto/FaturaInputDatabase";
import PDFRepository from "../repository";

interface Options {
    numeroCliente: string;
    mesReferencia: string;
    limit: number;
    offset: number;

}

export default class PDFService {
    static async saveInDatabase(data: FaturaInputDatabase) {

        return await PDFRepository.createPdfInDatabase(data)

       
    }

    static async getAllFromDatabase(options: Options | null) {

        return await PDFRepository.getAllDataFromDatabase(options)

    }


    static async findInvoiceById(id: string) {

        return await PDFRepository.findInvoiceById(id)

    }

    static async onlyGetNumberClient() {


        const data = await PDFRepository.findOnlyNumberClient()
        const numbers: number[] = []

        // i don't want return repeated numbers in the response
        data.forEach((item) => {
            if (!numbers.includes(item.numeroCliente)) {
                numbers.push(item.numeroCliente)
            }
        })

        return numbers

      
    }
    
}