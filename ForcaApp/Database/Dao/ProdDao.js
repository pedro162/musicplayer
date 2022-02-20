
import {getConnection} from 'typeorm';

//--------------------------------- Embalagem produto -----------------------------------------------
export const getEmbProd = async ({nome, tp_embalagem, produto_id})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;

	let retorno = await connection
	.getRepository("EmbalagemProduto")
	.createQueryBuilder("emb_prod")
	.innerJoin("emb_prod.embalagem","embalagem","embalagem.id=emb_prod.embalagem_id")
	.select(['emb_prod.id','emb_prod.embalagem_id', 'emb_prod.produto_id', 'emb_prod.id_api', 'emb_prod.status', 'emb_prod.vr_preco', 'emb_prod.vr_preco_min', 'emb_prod.tp_embalagem', 'embalagem.nome'])
   	.where("emb_prod.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
    	
        retorno.andWhere("embalagem.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(tp_embalagem){
    	retorno.andWhere("emb_prod.tp_embalagem LIKE :tp_embalagem", {tp_embalagem: `%${tp_embalagem}%` });
    }

    if(produto_id && produto_id > 0){
       	retorno.andWhere("emb_prod.produto_id = :produto_id", {produto_id: produto_id })
    }
    retorno.orderBy('emb_prod.id', 'DESC')
    retorno = retorno.getMany();
    return retorno;
   
    //console.log('sql: '+retorno)
	
}

export const getProduto = async ({nome})=>{
    const connection = getConnection();

    //const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
    //return retorno;
    
    //.getSql();
    if(nome){
        const retorno = await connection
        .getRepository("Produto")
        .createQueryBuilder("produtos")
        .innerJoin("produtos.marca","marca","marca.id=produtos.marca_id")
        .innerJoin("Estoque","estoque","estoque.produto_id=produtos.id")
        .select(['produtos.id','produtos.nome', 'produtos.marca_id', 'produtos.id_api', 'marca.nome', 'estoque.quantidade', 'estoque.quantidade_orc', 'estoque.disponivel'])
        .where("produtos.ativo = :ativo", {ativo: "yes" })
        .andWhere("marca.ativo = :ativo", {ativo: "yes" }) 
        .andWhere("produtos.nome LIKE :nome", {nome: `%${nome}%` })
        //.getSql();
        .orderBy('produtos.id', 'DESC')
        .getMany()
        //.getSql();

        console.log('----------------- produto')
        console.log(retorno)
        //console.log('sql: '+retorno)
        return retorno;
    }else{

        const retorno = await connection
        .getRepository("Produto")
        .createQueryBuilder("produtos")
        .innerJoin("produtos.marca","marca","marca.id=produtos.marca_id")
        .innerJoin("Estoque","estoque","estoque.produto_id=produtos.id")
        .select(['produtos.id','produtos.nome', 'produtos.marca_id', 'produtos.id_api', 'marca.nome', 'estoque.quantidade', 'estoque.quantidade_orc', 'estoque.disponivel'])
        .where("produtos.ativo = :ativo", {ativo: "yes" })
        .andWhere("marca.ativo = :ativo", {ativo: "yes" })         
        .orderBy('produtos.id', 'DESC')
        //.getSql();
        .getMany()
        //.getSql();

        console.log('----------------- produto')
        console.log(retorno)
        //console.log('sql: '+retorno)
        return retorno;
    }

   
    //console.log('sql: '+retorno)
    
}

export const findItem = async (id)=>{
    const connection = getConnection();

    const retorno = await connection.getRepository('Produto')
    .createQueryBuilder("produtos")
    .innerJoin("produtos.marca","marca","marca.id=produtos.marca_id")
    .select(['produtos.id','produtos.nome', 'produtos.marca_id', 'produtos.id_api', 'marca.nome'])
    .where("produtos.ativo = :ativo", {ativo: "yes" })
    .andWhere("marca.ativo = :ativo", {ativo: "yes" })
    .where("produtos.id = :id", {id: id }) 
    .getOne();
    //.findOne({id:id, ativo:'yes'});
    return retorno;
}