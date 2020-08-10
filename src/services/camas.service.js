import { api } from '../helpers/api';

const basePath = 'api/recuperacion/camas';

function getAll() { return api.get(`${basePath}/`); }

function show(camaId) { return api.get(`${basePath}/${camaId}`); }

function createCama(data) { return api.post(`${basePath}/`, data); }

function deleteCama(camaId) { return api.delete(`${basePath}/${camaId}`);}

function updateCama(camaId, data) {return api.put(`${basePath}/${camaId}`, data);}

function addCama(data) {return api.post(`api/recuperacion/cama/`, data);}

function removeCama(object) {return api.delete(`${basePath}/`, {data: object});}

const camaService = { getAll, show, createCama, deleteCama, updateCama, addCama, removeCama} ;

export default camaService;
