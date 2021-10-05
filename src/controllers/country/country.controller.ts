import { NextFunction, Request, Response, Router } from 'express';
import { countriesService } from '../../services/coutries/country.service';

const router = Router();

router.get('/', (req: Request<any, any, any>, res: Response, next: NextFunction) => {
  countriesService
    .getCountries()
    .then((countries) => {
      res.json(countries);
    })
    .catch(next);
});

router.delete('/', (req: Request<any, any, any>, res: Response, next: NextFunction) => {
  countriesService
    .deleteCountries()
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
});

// router.get('/random-generator', (req: Request<any, any, any>, res: Response, next: NextFunction) => {
//   const text = 'fasas';
//   res.json(text);
// });

export default router;
