import { Router } from 'express';
import PdfController from '../modules/pdf/controller'; 
import upload from '../middlewares/upload/multer';
const router = Router();

router.post('/read', upload.single('pdf'), PdfController.readPdf);
router.get('/retrieve-all', PdfController.getAllData);
router.get('/retrieve/:id', PdfController.findInvoiceById);
router.get('/retrieve-number-client', PdfController.getOnlyNumberClient);

export default router;