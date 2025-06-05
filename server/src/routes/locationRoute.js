import express from 'express';
import { getCountries, getStates, getCities } from '../controllers/locationController.js';

const router = express.Router();

router.get('/countries', getCountries);
router.get('/states/:countryName', getStates);
router.get('/cities/:countryName/:stateName', getCities);

export default router;
