const  connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {name}  = request.body;
       //pesquisa pelo nome
        const produto = await connection('produto')
           .where('name', 'like','%'+name+"%");

           return response.json(produto);
    }
}

