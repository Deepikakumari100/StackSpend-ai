export * from '../lib/audit-engine';
import emailRoutes from './routes/email';

app.use('/api/email', emailRoutes);