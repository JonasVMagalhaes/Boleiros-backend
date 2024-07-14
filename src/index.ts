import express from "express";

import Configuration from './configuration';

const app = express();

new Configuration(app);

app.listen(process.env.PORT || 3000, () => console.log("Iniciando projeto node na porta " + process.env.PORT));
