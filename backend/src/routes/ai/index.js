// AI INTEGRATION LAYER - new file
import express from 'express';
const router = express.Router();
router.use('/analyze', (await import('./analyze.js')).default);
router.use('/match', (await import('./match.js')).default);
router.use('/price', (await import('./price.js')).default);
router.use('/health', (await import('./health.js')).default);
router.use('/dashboard', (await import('./dashboard.js')).default);
router.use('/scraper', (await import('./scraper.js')).default);
router.use('/training', (await import('./training.js')).default);
export default router;
