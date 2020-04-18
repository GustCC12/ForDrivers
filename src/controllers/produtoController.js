const  connection = require('../database/connection');

module.exports ={
    //lista os produtos cadastrados
    async index(request, response) {
        const{ page = 1 } = request.query;

        const [count] = await connection('produto').count();

        const produto = await connection('produto').select('*')
        .join('usuario','usuario.id', '=', 'produto.usuario_id')
             .limit(5)
             .offset((page - 1) * 5)
             .select(['produto.*',
                      'usuario.name', 
                      'usuario.fone',
                      'usuario.city',
                      'usuario.uf',
                      'usuario.address' ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(produto);
    },
    //cria novos produtos
    async create(request, response) {
        const {name, description, value, quantidade} = request.body;
        const usuario_id = request.headers.authorization;

       const [id] = await connection('produto').insert({
            name,
            description,
            value,
            quantidade,
            usuario_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const produto = await connection('produto')
           .where('id', id)
           .select('usuario_id')
           .first();

        if(produto.usuario_id != usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    await connection('produto').where('id', id).delete();

    return response.status(204).send();
    }
};