const BASE_URL = "https://dev-mbg-production.up.railway.app";

const API = {
    dapur: {
        getAll: () => axios.get(`${BASE_URL}/api/dapur`),
        getOne: (id) => axios.get(`${BASE_URL}/api/dapur/${id}`),
        create: (data) => axios.post(`${BASE_URL}/api/dapur`, data),
        update: (id, data) => axios.put(`${BASE_URL}/api/dapur/${id}`, data),
        delete: (id) => axios.delete(`${BASE_URL}/api/dapur/${id}`)
    },
    menu: {
        getAll: () => axios.get(`${BASE_URL}/api/menu`),
        getOne: (id) => axios.get(`${BASE_URL}/api/menu/${id}`),
        create: (data) => axios.post(`${BASE_URL}/api/menu`, data),
        update: (id, data) => axios.put(`${BASE_URL}/api/menu/${id}`, data),
        delete: (id) => axios.delete(`${BASE_URL}/api/menu/${id}`)
    },
    inventory: {
        getAll: () => axios.get(`${BASE_URL}/api/inventory`),
        getOne: (id) => axios.get(`${BASE_URL}/api/inventory/${id}`),
        create: (data) => axios.post(`${BASE_URL}/api/inventory`, data),
        update: (id, data) => axios.put(`${BASE_URL}/api/inventory/${id}`, data),
        delete: (id) => axios.delete(`${BASE_URL}/api/inventory/${id}`)
    },
    sekolah: {
        getAll: () => axios.get(`${BASE_URL}/api/sekolah`),
        getOne: (id) => axios.get(`${BASE_URL}/api/sekolah/${id}`),
        create: (data) => axios.post(`${BASE_URL}/api/sekolah`, data),
        update: (id, data) => axios.put(`${BASE_URL}/api/sekolah/${id}`, data),
        delete: (id) => axios.delete(`${BASE_URL}/api/sekolah/${id}`)
    },
    distribusi: {
        getAll: () => axios.get(`${BASE_URL}/api/distribusi`),
        getOne: (id) => axios.get(`${BASE_URL}/api/distribusi/${id}`),
        create: (data) => axios.post(`${BASE_URL}/api/distribusi`, data),
        update: (id, data) => axios.put(`${BASE_URL}/api/distribusi/${id}`, data),
        delete: (id) => axios.delete(`${BASE_URL}/api/distribusi/${id}`)
    }
};