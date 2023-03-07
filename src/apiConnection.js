import axios from "axios";

class ApiConnection {
    constructor(apiUrl) {
        this.connection = axios.create({
            baseURL: apiUrl,
            headers: { "Content-type": "application/json" }
        });
        this.apiBaseRoute = "/pessoas";
    }

    async create(data) {
        return this.connection.post(this.apiBaseRoute, data);
    }

    async update(id, data) {
        return this.connection.put(this.apiBaseRoute + `/${id}`, data);
    }

    async delete(id) {
        return this.connection.delete(this.apiBaseRoute + `/${id}`);
    }

    async fetch(id) {
        return this.connection.get(this.apiBaseRoute + `/${id}`);
    }

    async fetchAll() {
        return this.connection.get(this.apiBaseRoute);
    }
}

export default new ApiConnection('http://localhost:3001/api');