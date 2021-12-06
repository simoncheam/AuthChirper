import * as express from 'express';
import chirps_router from './chirps';
import users_router from './users';
import tags_router from './tags';
import donate_router from './donate';

const router = express.Router();

router.use('/chirps', chirps_router);
router.use('/users', users_router);
router.use('/tags', tags_router);
router.use('/donate', donate_router);

export default router;