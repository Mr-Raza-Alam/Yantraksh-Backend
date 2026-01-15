import { Router } from 'express';
import { 
    broadcastToLeaders, 
    sendWelcomeEmail, 
    sendTeamRegEmail, 
    sendBuyerEmail, 
    sendAccommodationEmail 
} from './mail.controller';

const router = Router();

router.post('/send-welcome', sendWelcomeEmail);
router.post('/send-team-reg', sendTeamRegEmail);
router.post('/send-buyer', sendBuyerEmail);
router.post('/send-accommodation', sendAccommodationEmail);
router.post('/broadcast-leaders', broadcastToLeaders);

export default router;