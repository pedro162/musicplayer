import {getConnection} from 'typeorm';

export const getEstoque = async ({nome, produto_id,filial_id})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();
   /* if(nome){
    	const retorno = await connection
		.getRepository("Estoque")
		.createQueryBuilder("estoques")
		.innerJoin("estoques.produto","produto","produto.id=estoques.produto_id")
		.select(['estoques.id','estoques.produto_id', 'estoques.id_api', 'produto.nome', 'estoques.quantidade', 'estoques.quantidade_orc', 'estoques.disponivel'])
        .where("estoques.ativo = :ativo", {ativo: "yes" })
        .andWhere("produto.ativo = :ativo", {ativo: "yes" }) 
        .andWhere("produto.nome LIKE :nome", {nome: `%${nome}%` })
        //.getSql();
        .orderBy('estoques.id', 'DESC')
        .getMany()
        //.getSql();

        console.log('----------------- Estoque')
        console.log(retorno)
        //console.log('sql: '+retorno)
		return retorno;
    }else{

    	const retorno = await connection
		.getRepository("Estoque")
		.createQueryBuilder("estoques")
		.innerJoin("estoques.produto","produto","produto.id=estoques.produto_id")
		.select(['estoques.id','estoques.produto_id', 'estoques.id_api', 'produto.nome', 'estoques.quantidade', 'estoques.quantidade_orc', 'estoques.disponivel'])
        .where("estoques.ativo = :ativo", {ativo: "yes" })
        .andWhere("produto.ativo = :ativo", {ativo: "yes" })	       
        .orderBy('estoques.id', 'DESC')
        //.getSql();
        .getMany()
        //.getSql();

        console.log('----------------- Estoque')
        console.log(retorno)
        //console.log('sql: '+retorno)
		return retorno;
    }*/

    //const connection = getConnection();

    //const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
    //return retorno;
    
    //.getSql();

    let sql = `SELECT est.id, est.produto_id, est.quantidade, est.quantidade_orc, est.disponivel, p.nome FROM estoques as est INNER JOIN produtos p ON (est.produto_id=p.id) WHERE p.ativo="yes" and est.ativo="yes"`;
    let params = []
    if(nome){
        sql += ` and p.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(filial_id){   
        sql += ` and est.filial_id = ?  `;     
        params.push(filial_id)     
    }

    if(produto_id){   
        sql += ` and est.produto_id = ?  `;     
        params.push(produto_id)     
    }

    sql += ` order by est.produto_id desc `; 

    let retorno = await connection
    .getRepository("Estoque")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_produtos" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneEstoqueProduto = async ({nome, produto_id, filial_id})=>{
    const connection = getConnection();

    //const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
    //return retorno;
    
    //.getSql();

    let retorno = await connection
    .getRepository("Estoque")
    .createQueryBuilder("estoques")
    .innerJoin("estoques.produto","produto","produto.id=estoques.produto_id")
    .select(['estoques.id','estoques.produto_id', 'estoques.filial_id','estoques.id_api', 'produto.nome', 'estoques.quantidade', 'estoques.quantidade_orc', 'estoques.disponivel'])
    .where("estoques.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("produto.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(produto_id){        
        retorno.andWhere("estoques.produto_id = :produto_id", {produto_id: produto_id})        
    }

    if(filial_id){        
        retorno.andWhere("estoques.filial_id = :filial_id", {filial_id: filial_id})        
    }

    retorno.orderBy('estoques.id', 'DESC')
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