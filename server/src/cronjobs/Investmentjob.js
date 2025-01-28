import cron from 'node-cron';
import { Investment } from '../mongodb/models.js';

// Example cron job that runs every hour
cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const expiredInvestments = await Investment.updateMany(
        { status: 'active', expiryDate: { $lte: now } },
        { status: 'expired' }
    );
    console.log(`Updated ${expiredInvestments.nModified} investments to expired.`);
});