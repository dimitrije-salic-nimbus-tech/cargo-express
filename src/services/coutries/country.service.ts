import axios from 'axios';
import { cacheServis } from '../../config/cache/redis.config';
import CacheKey from '../../shared/enums/cuntries.enum';

type CountryType = {
  name: string;
  code: string;
};

const getCountries = async (): Promise<CountryType[]> => {
  if (await cacheServis.exist(CacheKey.Countries)) {
    console.log('Already exists');
    return cacheServis.get<{ name: string; code: string }[]>(CacheKey.Countries);
  }
  return axios.get('https://restcountries.eu/rest/v2/region/europe').then((response) =>
    cacheServis.store<{ name: string; code: string }[]>(
      CacheKey.Countries,
      response.data
        // @ts-ignore
        .map((country) => {
          return {
            name: country.name,
            code: country.alpha3Code,
          };
        }),
    ),
  );
};

const deleteCountries = async (): Promise<void> => {
  await cacheServis.remove(CacheKey.Countries);
};

export const countriesService = {
  getCountries,
  deleteCountries,
};
