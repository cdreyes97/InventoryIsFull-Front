import { api } from '../helpers/api';

const basePath = 'api/pabellon';

function getAll() { return api.get(`${basePath}/`); }

function show(pabellonId) { return api.get(`${basePath}/${pabellonId}`); }

function createPabellon(data) { return api.post(`${basePath}/`, data); }

function deletePabellon(pabellonId) { return api.delete(`${basePath}/${pabellonId}`);}

function updatePabellon(pabellonId, data) {return api.put(`${basePath}/${pabellonId}`, data);}

const pabellonService = { getAll, show, createPabellon, deletePabellon, updatePabellon};

export default pabellonService;
