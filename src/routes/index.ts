import { Application } from 'express';

import userRoute from './UserRoute';

function route(app: Application) {
    app.use('api/v1/user',userRoute);
}

export default route;
