import express from 'express'
const router = express.Router();
import AuthRoute from './AuthRoute'
import FormRoute from './FormRoute'
import ResponseRoute from './ResponseRoute'

const defaultRoutes = [
    {
        path: '/auth',
        route: AuthRoute
    },
    {
        path: '/form',
        route: FormRoute
    },
    {
        path: '/response',
        route: ResponseRoute
    }
];

router.get('/', (_, res) => {
    res.send({ message: `Server is running..` })
});

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
