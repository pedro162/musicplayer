import {getConnection} from 'typeorm';

export const getVendaProduto = async ({nome, filial_id, produto_id, id, venda_id})=>{
	const connection = getConnection();
	/*
				,id_api,
			produto_id,
			venda_id,
			embalagem_id,
			qtd,
			qtd_devolvido,
			vr_bruto,
			vr_liquido,
			vr_desconto,
			tp_desconto,
			usuario_id,
			status,
			dt_cincronizacao,
			ativo,
				 
			*/
    let sql = `SELECT 
    			venp.id,
                venp.id_api,
				venp.produto_id,
				venp.venda_id,
				venp.embalagem_id,
				venp.qtd,
				venp.qtd_devolvido,
				venp.vr_bruto,
				venp.vr_liquido,
				venp.vr_desconto,
				venp.tp_desconto,
				venp.usuario_id,
				venp.status,
				venp.dt_cincronizacao,
				venp.ativo,
				p.nome
			FROM 
				vendas_produtos as venp
				INNER JOIN vendas as vend ON (vend.id=venp.venda_id)
				INNER JOIN produtos as p ON (p.id=venp.produto_id)
			WHERE 
				venp.ativo="yes" and vend.ativo="yes" and p.ativo="yes"`;
    let params = []//
    if(nome){
        sql += ` and p.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(produto_id){   
        sql += ` and vend.produto_id = ?  `;     
        params.push(produto_id)     
    }

    if(id){        
       sql += ` and venp.id = ?  `;     
       params.push(id)           
    }

    if(venda_id){        
       sql += ` and venp.venda_id = ?  `;     
       params.push(venda_id)           
    }

    sql += ` order by vend.id desc `; 

    let retorno = await connection
    .getRepository("VendasProdutos")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneVendaProduto = async ({nome, pessoa_id, filial_id, id})=>{
    const connection = getConnection();

    //const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
    //return retorno;
    
    //.getSql();
    /*
		produto
venda
embalagem
    */

    let retorno = await connection
    .getRepository("VendasProdutos")
    .createQueryBuilder("vendas_produtos")
    .innerJoin("vendas_produtos.venda","venda","venda.id=vendas_produtos.venda_id")
    .innerJoin("vendas_produtos.produto","produto","produto.id=vendas_produtos.produto_id")
    .innerJoin("vendas_produtos.embalagem","embalagem","embalagem.id=vendas_produtos.embalagem_id")
    .select([
    		'vendas_produtos.id_api',
			'vendas_produtos.produto_id',
			'vendas_produtos.venda_id',
			'vendas_produtos.embalagem_id',
			'vendas_produtos.qtd',
			'vendas_produtos.qtd_devolvido',
			'vendas_produtos.vr_bruto',
			'vendas_produtos.vr_liquido',
			'vendas_produtos.vr_desconto',
			'vendas_produtos.tp_desconto',
			'vendas_produtos.usuario_id',
			'vendas_produtos.status',
			'vendas_produtos.dt_cincronizacao',
			'vendas_produtos.ativo',
			'produto.nome',
			'embalagem.nome as  nome_embalagem'

    ])
    .where("vendas_produtos.ativo = :ativo", {ativo: "yes" })
    .andWhere("venda.ativo = :ativo", {ativo: "yes" })
    .andWhere("embalagem.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("produto.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(nome_embalagem){
        
        retorno.andWhere("embalagem.nome LIKE :nome_embalagem", {nome_embalagem: `%${nome_embalagem}%` })
        
    }

    if(produto_id){        
        retorno.andWhere("vendas_produtos.produto_id = :produto_id", {produto_id: produto_id})        
    }

    if(venda_id){        
        retorno.andWhere("vendas_produtos.venda_id = :venda_id", {venda_id: venda_id})        
    }

    if(id){        
        retorno.andWhere("vendas_produtos.id = :id", {id: id})        
    }

    retorno.orderBy('vendas_produtos.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}


export const findeLastVendaProduto = async ()=>{
    const connection = getConnection();

    //const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
    //return retorno;
    
    //.getSql();
    /*
		filial
		
		pessoa_vendedor
		pessoa_libera_desconto
		pessoa_cancel_venda
    */

    let retorno = await connection
    .getRepository("VendasProdutos")
    .createQueryBuilder("vendas_produtos")
    .select([
    		'vendas_produtos.id',

    ])
    
    retorno.orderBy('vendas_produtos.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}