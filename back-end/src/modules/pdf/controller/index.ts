import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import PdfParse from "pdf-parse";
import { JsonOutputPdf } from "../dto/jsonOutputPdf";
import PDFService from "../services";
import { FaturaInputDatabase } from "../dto/FaturaInputDatabase";
import { FaturaOutputDatabase } from "../dto/FaturaOutputDatabase";

export default class PdfController {
  static async readPdf(req: Request, res: Response) {
    //#swagger.tags = ['PDF']
    //#swagger.description = 'Endpoint to read a PDF file'
    /* #swagger.parameters['pdf'] = {
          in: 'formData',
          required: true,
          type: 'file',
          description: 'PDF file to be read'
      } */

    const file = req.file;
    const dataBuffer = await fs.readFile(file?.path as string);

    try {
      const data = await PdfParse(dataBuffer);

      const transformTextToJSON = (text: string) => {
        const lines = text.split("\n");
        const jsonData: JsonOutputPdf = {
          numeroCliente: 0,
          mesReferencia: "",
          energiaEletrica: {
            qtd: 0,
            preco_Unitario: 0,
            valor: 0,
          },
          energiaSCEEE: {
            qtd: 0,
            preco_Unitario: 0,
            valor: 0,
          },
          energiaCompensada: {
            qtd: 0,
            preco_Unitario: 0,
            valor: 0,
          },
          contribIlumPublicaMunicipal: {
            valor: 0,
          },
        };

        lines.forEach((item) => {
          if (item !== "") {
            const parts = item.trim().split(/\s+/);
          
            if (
              parts[0] === "Energia" &&
              (parts[1] === "Elétrica" || parts[1] === "ElétricakWh")
            ) {
              const obj = {
                qtd: parseFloat(parts[2].replace(",", ".")),
                preco_Unitario: parseFloat(parts[3].replace(",", ".")),
                valor: parseFloat(parts[4].replace(",", ".")),
              };
              jsonData.energiaEletrica = obj;
            }

            if ((parts[0] === "Energia" && parts[1] === "SCEE") || (parts[0] === "En" && parts[1] === "comp.")) {
                let data: string[] = []
                console.log(parts)
                if(parts.includes('s/')){
                    data = parts.slice(4)
                    console.log(data)
                } else{
                    data = parts.slice(3)
                    console.log(data)
                }


              const obj = {
                qtd: parseFloat(data[1].replace(",", ".")),
                preco_Unitario: parseFloat(data[2].replace(",", ".")),
                valor: parseFloat(data[3].replace(",", ".")),
              };
              jsonData.energiaSCEEE = obj;
            }
            if (parts[0] === "Energia" && parts[1] === "compensada") {
              const obj = {
                qtd: parseFloat(parts[4].replace(",", ".")),
                preco_Unitario: parseFloat(parts[5].replace(",", ".")),
                valor: parseFloat(parts[6].replace(",", ".")),
              };
              jsonData.energiaCompensada = obj;
            }

            if (parts[0] === "Contrib" && parts[1] === "Ilum") {
              const obj = {
                valor: parseFloat(parts[4].replace(",", ".")),
              };
              jsonData.contribIlumPublicaMunicipal = obj;
            }

            const match = text.match(/\b\d{10}\b/); // Encontrando um número de 10 dígitos
            if (match && jsonData.numeroCliente === 0) {
              jsonData.numeroCliente = parseInt(match[0]);
            }

            const matchMesReferente = text.match(
              /(\b(?:JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/\d{4}\b)/
            ); // Encontrando um padrão de mês/ano
            if (matchMesReferente && jsonData.mesReferencia === "") {
              jsonData.mesReferencia = matchMesReferente[0];
            }
          }
        });



        console.log(jsonData);

        return jsonData;
      };

      const jsonResult = transformTextToJSON(data.text);

      const convertToDatabase: FaturaInputDatabase = {
        numeroCliente: jsonResult.numeroCliente.toString(),
        mesReferencia: jsonResult.mesReferencia,
        energiaEletrica_qtd: jsonResult.energiaEletrica.qtd,
        energiaEletrica_preco_Unitario:
          jsonResult.energiaEletrica.preco_Unitario,
        energiaEletrica_valor: jsonResult.energiaEletrica.valor,
        energiaSCEEE_qtd: jsonResult.energiaSCEEE.qtd,
        energiaSCEEE_preco_Unitario: jsonResult.energiaSCEEE.preco_Unitario,
        energiaSCEEE_valor: jsonResult.energiaSCEEE.valor,
        energiaCompensada_qtd: jsonResult.energiaCompensada.qtd,
        energiaCompensada_preco_Unitario:
          jsonResult.energiaCompensada.preco_Unitario,
        energiaCompensada_valor: jsonResult.energiaCompensada.valor,
        contribIlumPublicaMunicipal_valor:
          jsonResult.contribIlumPublicaMunicipal.valor,
          pathUrl: file?.path as string,
      };

      const outputDatabase: FaturaOutputDatabase =
        await PDFService.saveInDatabase(convertToDatabase);

      return res.status(200).json({
        success: true,
        pdfData: outputDatabase,
        message: 'Data retrieved successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error reading PDF",
      });
    }
  }

  static async getAllData(req: Request, res: Response) {
    //#swagger.tags = ['PDF']
    //#swagger.description = 'Endpoint to get all data from database'

    try {

        
        const { numeroCliente, mesReferencia, offset, limit } = req.query
        const options = {
            numeroCliente: numeroCliente as string,
            mesReferencia: mesReferencia as string,
            offset: parseInt(offset as string) || 0,
            limit: parseInt(limit as string) || 10
        }
        
        const pdfData: FaturaOutputDatabase[]= await PDFService.getAllFromDatabase(options)

        return res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: pdfData
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,    
            message: "Error getting data"
        })
        
    }

  }
  static async findInvoiceById(req: Request, res: Response) {

    try {

        const { id } = req.params

        const pdfData : FaturaOutputDatabase | null = await PDFService.findInvoiceById(id)

        return res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: pdfData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error getting data"
        })
    }

  

}

static async getOnlyNumberClient(req: Request, res: Response) {
    try {
        const data = await PDFService.onlyGetNumberClient()

        return res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error getting data"
        })
    }
  }

  
}
