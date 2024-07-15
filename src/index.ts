import express from "express";

import Configuration from './configuration';

const app= express();
const configuration: Configuration = new Configuration();

configuration.apply(app);

app.listen(process.env.PORT || 3000, () => console.log("Iniciando projeto node na porta " + process.env.PORT));
