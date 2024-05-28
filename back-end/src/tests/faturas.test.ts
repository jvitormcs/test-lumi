import { Request, Response } from "express";
import InvoiceController from "../modules/pdf/controller";
import sequelize from "./setup/sequelize";
describe(" Invoice Controller", () => {

    beforeAll(async () => {
        await sequelize.sync();
    })
    afterAll(async () => {
        await sequelize.close();
    })

    test('process pdf file', async () => {
        const req = {
            file: {
                path: './faturas/Instalacao_3000055479/3000055479-01-2023.pdf'
            }
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response

        await InvoiceController.readPdf(req, res)

        expect(res.json).toHaveBeenCalledWith({success: true, message: 'Data retrieved successfully', pdfData: expect.any(Object)})
    })

    test('find all invoices', async () => {
        const req: unknown = {
            query: {
                numeroCliente: "",
                mesReferencia: "",
                offset: 0,
                limit: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await InvoiceController.getAllData(req as Request, res);

        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Data retrieved successfully', data: expect.any(Array) });
    });

    test('find invoice by id', async () => {
        const req: unknown = {
            params: {
                id: "9a10230e-c810-466a-a772-571f9250f600"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await InvoiceController.findInvoiceById(req as Request, res);

        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Data retrieved successfully', data: expect.any(Object) });
    })

    test('get only number client', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await InvoiceController.getOnlyNumberClient({} as Request, res);

        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Data retrieved successfully', data: expect.any(Array)});
    })
});
