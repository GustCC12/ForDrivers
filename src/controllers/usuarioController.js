const connection = require('../database/connection');

module.exports = {
        async login (request, response){
        const {login, password} = request.body;
        const usuario = await connection('usuario').select('login','password');

        if(login != usuario.login){
            return response.status(401).json({error: 'Usuario incorretos'});
        }
        if(password != usuario.password){
            return response.status(401).json({error: 'senha incorretos'});
        }

        return response.status(204).send();
    },

    /// listar todos os usuario 
    async index (request, response) {
        const usuario = await connection('usuario').select('*');
    
        return response.json(usuario);
    },
    // criar usuario e retornar login e senha para validação 
    async create(request, response) {
        const {login, password, name, fone, city, uf, address} = request.body;

        await connection('usuario').insert({
            login,
            password,
            name,
            fone,
            city,
            uf,
            address,
            
        })
    
        return response.json({login, password});
    }
};