import { Router } from 'express';
import PdfRoutes from './pdf.routes';

const router = Router();

router.use('/api/invoice', PdfRoutes);

export default router;