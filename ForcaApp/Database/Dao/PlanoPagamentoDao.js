import {getConnection} from 'typeorm';

export const getPlanoPagamento = async ({nome, id})=>{
	const connection = getConnection();
	
    let sql = `SELECT 
    			pl.id,
    			pl.id_plano_pagamento_api,
    			pl.nome,
				pl.usuario_id,
				pl.status,
				pl.liberado,
				pl.dt_criacao,
				pl.dt_cincronizacao,
				pl.ativo
			FROM 
				planos_pagamento as pl
			`;
    let params = []
    if(nome){
        sql += ` and pl.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(id){   
        sql += ` and pl.id = ?  `;     
        params.push(id)     
    }
    sql += ` WHERE pl.ativo="yes"`; 
    sql += ` order by pl.id desc `; 

    let retorno = await connection
    .getRepository("PlanosPagamento")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOnePlanoPagamento = async ({nome, pessoa_id, filial_id, id})=>{
    const connection = getConnection();

    let retorno = await connection
    .getRepository("PlanosPagamento")
    .createQueryBuilder("planos_pagamento")
    //.innerJoin("planos_pagamento.pessoa","pessoa","pessoa.id=planos_pagamento.pessoa_id")
    .select([
    		'planos_pagamento.id',
			'planos_pagamento.id_plano_pagamento_api',
			'planos_pagamento.nome',
			'planos_pagamento.usuario_id',
			'planos_pagamento.status',
			'planos_pagamento.liberado',
			'planos_pagamento.dt_criacao',
			'planos_pagamento.dt_cincronizacao',
			'planos_pagamento.ativo'
    ])
    .where("planos_pagamento.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("planos_pagamento.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(id){        
        retorno.andWhere("planos_pagamento.id = :id", {id: id})        
    }

    retorno.orderBy('planos_pagamento.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}

export const findeLastPlanoPagamento = async ()=>{
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
    .getRepository("PlanosPagamento")
    .createQueryBuilder("planos_pagamento")
    .select([
    		'planos_pagamento.id',

    ])
    
    retorno.orderBy('planos_pagamento.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}