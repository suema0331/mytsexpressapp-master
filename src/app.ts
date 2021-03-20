import express, {Request,Response,NextFunction} from 'express';
import todoRoutes from './routes/todos';
import { json } from "body-parser";


//commonJsの構文
//const express = require('express'); //nodejsの関数でブラウザには存在しない

const app = express();

// body-parserミドルウェアがpostリクエストで受けたjsonをパースして、requestオブジェクトのbodyに格納
app.use(json());

app.use('/todos', todoRoutes);//todoRoutesのrouting設定を使用

//エラーキャッチを行う middleware関数を指定
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({message:err.message});
});

app.listen(3000); //port指定








