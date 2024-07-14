import express, {Request} from 'express';

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    // res.status(200).json({
    //     username: req.session.user.username,
    // });
})

export default router;