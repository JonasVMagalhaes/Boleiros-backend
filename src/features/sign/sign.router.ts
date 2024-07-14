import express from 'express';

export default class SignController {
    constructor(private readonly router: express.Router) { }

    initializeRoutes() {
        this.router.get('/sign', this.handleGetRequest);
    }

    handleGetRequest(req: express.Request, res: express.Response) {
        return res.send('Funcionou');
        // console.log("teste123")
        // const signin = true;
        // if(signin) {
        //     req.session.user = {
        //         username: 'Jonas',
        //         accessToken: '123456'
        //     }
        // }
        //
        // res.status(200).json({})
    }
}