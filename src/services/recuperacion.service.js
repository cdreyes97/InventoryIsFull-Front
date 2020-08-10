import { api } from '../helpers/api';

const basePath = 'api/recuperacion';

function getAll() { return api.get(`${basePath}/`); }

function show(recuperacionId) { return api.get(`${basePath}/${recuperacionId}`); }

function createRecuperacion(data) { return api.post(`${basePath}/`, data); }

function deleteRecuperacion(recuperacionId) { return api.delete(`${basePath}/${recuperacionId}`);}

function updateRecuperacion(recuperacionId, data) {return api.put(`${basePath}/${recuperacionId}`, data);}

const recuperacionService = { getAll, show, createRecuperacion, deleteRecuperacion, updateRecuperacion};

export default recuperacionService;
