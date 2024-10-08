import { Application } from 'express';

import userRoute from './user/index';
import adminRoute from './admin/index';

function route(app: Application) {
    app.use('/',userRoute);
    app.use('/admin',adminRoute);
}

export default route;
