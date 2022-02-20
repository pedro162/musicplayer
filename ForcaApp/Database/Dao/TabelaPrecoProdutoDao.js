
import {getConnection} from 'typeorm';

export const getTabelaPrecoProduto = async ({nome})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();

    let retorno = await connection
	.getRepository("TabelaPrecoProduto")
	.createQueryBuilder("tabela_preco_produtos")
	.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome', 'tabela_preco_produtos.id_api', 'tabela_preco_produtos.status', 'tabela_preco_produtos.produto_id', 'tabela_preco_produtos.tabela_preco_id', 'tabela_preco_produtos.filial_id'])
    .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
    	
        retorno.andWhere("tabela_preco_produtos.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    retorno.orderBy('tabela_preco_produtos.id', 'DESC')
    retorno = retorno.getMany();
    return retorno;





    /*if(nome){
    	const retorno = await connection
		.getRepository("TabelaPrecoProduto")
		.createQueryBuilder("tabela_preco_produtos")
		.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome', 'tabela_preco_produtos.id_api', 'tabela_preco_produtos.status'])
        .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
        .andWhere("tabela_preco_produtos.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('tabela_preco_produtos.id', 'DESC')
        .getMany()

        console.log('----------------- tabela_preco_produtos')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("TabelaPrecoProduto")
		.createQueryBuilder("tabela_preco_produtos")
		.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome', 'tabela_preco_produtos.id_api','tabela_preco_produtos.status'])
        .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
        .orderBy('tabela_preco_produtos.id', 'DESC')
        .getMany()
        
        console.log('----------------- tabela_preco_produtos')
    	console.log(retorno)
        return retorno;
    }

   */
    //console.log('sql: '+retorno)
	
}

export const findeOneTabelaPrecoProduto = async ({nome, produto_id, filial_id, tabela_preco_id, estado_id,})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();

    /*
		filial_id
		
		
    */

    let retorno = await connection
	.getRepository("TabelaPrecoProduto")
	.createQueryBuilder("tabela_preco_produtos")
	.innerJoin("tabela_preco_produtos.tabela_de_preco","tabela_preco","tabela_preco.id=tabela_preco_produtos.tabela_preco_id")
	.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome','tabela_preco.estado_id', 'tabela_preco_produtos.id_api', 'tabela_preco_produtos.status', 'tabela_preco_produtos.produto_id', 'tabela_preco_produtos.tabela_preco_id', 'tabela_preco_produtos.filial_id', 'tabela_preco_produtos.vr_preco', 'tabela_preco_produtos.vr_preco_min'])
    .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
    	
        retorno.andWhere("tabela_preco_produtos.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(produto_id){
    	
        retorno.andWhere("tabela_preco_produtos.produto_id = :produto_id", {produto_id: produto_id })
        
    }

    if(filial_id){        
        retorno.andWhere("tabela_preco_produtos.filial_id = :filial_id", {filial_id: filial_id})        
    }

    if(tabela_preco_id){        
        retorno.andWhere("tabela_preco_produtos.tabela_preco_id = :tabela_preco_id", {tabela_preco_id: tabela_preco_id})        
    }

    if(estado_id){        
        retorno.andWhere("tabela_preco.estado_id = :estado_id", {estado_id: estado_id})        
    }

    retorno.orderBy('tabela_preco_produtos.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;





    /*if(nome){
    	const retorno = await connection
		.getRepository("TabelaPrecoProduto")
		.createQueryBuilder("tabela_preco_produtos")
		.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome', 'tabela_preco_produtos.id_api', 'tabela_preco_produtos.status'])
        .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
        .andWhere("tabela_preco_produtos.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('tabela_preco_produtos.id', 'DESC')
        .getMany()

        console.log('----------------- tabela_preco_produtos')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("TabelaPrecoProduto")
		.createQueryBuilder("tabela_preco_produtos")
		.select(['tabela_preco_produtos.id', 'tabela_preco_produtos.nome', 'tabela_preco_produtos.id_api','tabela_preco_produtos.status'])
        .where("tabela_preco_produtos.ativo = :ativo", {ativo: "yes" })
        .orderBy('tabela_preco_produtos.id', 'DESC')
        .getMany()
        
        console.log('----------------- tabela_preco_produtos')
    	console.log(retorno)
        return retorno;
    }

   */
    //console.log('sql: '+retorno)
	
}

export const updateTabelaPreco = async ()=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();

    //let retorno = await connection
	//.getRepository("TabelaPrecoProduto")
	//.query(`UPDATE "tabela_preco_produtos" set estado_id=1 where id=1`)
	//.query(`ALTER TABLE "tabela_preco_produtos" ADD COLUMN "estado_id" int default null`)
    


	
}

