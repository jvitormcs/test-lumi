import Fatura from "../../../db/models/faturaModel";
import { FaturaInputDatabase } from "../dto/FaturaInputDatabase";
type OptionalFaturaInput = Omit<FaturaInputDatabase, 'faturaId'>;

interface Options {
    numeroCliente: string;
    mesReferencia: string;
    limit: number;
    offset: number;
}

export default class PDFRepository {


    static async createPdfInDatabase(data : OptionalFaturaInput) {
        
        const createdInvoice = await Fatura.create(data) 
    

        return createdInvoice
    
    }

    static async getAllDataFromDatabase(options: Options | null) {

        const sequelizeOptions: any = {
            where: {},
        };

        if (options) {
            if (options.numeroCliente) {
                sequelizeOptions.where.numeroCliente = options.numeroCliente;
            }

            if (options.mesReferencia) {
                sequelizeOptions.where.mesReferencia = options.mesReferencia;
            }

            if (options.limit !== undefined) {
                sequelizeOptions.limit = options.limit;
            }

            if (options.offset !== undefined) {
                sequelizeOptions.offset = options.offset;
            }
        }


            const data = await Fatura.findAll(sequelizeOptions)
            return data
        

    }

    static async findInvoiceById(id: string) {

       
            const data = await Fatura.findByPk(id)
            return data
        


    }

    static async findOnlyNumberClient() {

        const data = await Fatura.findAll({
            attributes: ['numeroCliente']
        })

        return data


    }
}