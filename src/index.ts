import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || 'localhost';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise)
            result.then(result => (result ? res.send(result) : undefined));
          else if (result) res.json(result);
        }
      );
    });
    app.listen(PORT);
    console.log(
      `Express server has started on port 3000. Open http://${HOST}:${PORT}/games to see results`
    );
  })
  .catch(error => console.log(error));
