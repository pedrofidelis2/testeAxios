const axios = require('axios');

const api = axios.create({
    baseURL: "http://localhost:3000"
});

class Cliente {
    
    obterTodos = async () => {
        const resp = await api.get('/personagens');
        return resp.data; // Não é necessário o 'await' em resp.data
    }

    incluir = async (nome, ataque, defesa) => {
        const resp = await api.post('/personagens', { nome, ataque, defesa });
        return resp.data;
    }

    obter = async (id) => {
        const resp = await api.get(`/personagens/${id}`);
        return resp.data;
    }

    excluir = async (id) => {
        const resp = await api.delete(`/personagens/${id}`);
        return resp.data;
    }

    alterar = async (id, nome, ataque, defesa) => {
        const resp = await api.put(`/personagens/${id}`, { nome, ataque, defesa });
        return resp.data;
    }
}

module.exports = Cliente;