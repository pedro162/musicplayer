import {getConnection} from 'typeorm';

export const getVendaCobranca = async ({nome,plano_pagamento_id, forma_pagamento_id, id, venda_id})=>{
	const connection = getConnection();
	
    let sql = `SELECT 
    			vc.id,
                vc.id_venda_cobranca_api,
				vc.forma_pagamento_id,
				vc.plano_pagamento_id,
				vc.operador_financeiro_id,
				vc.venda_id,
				vc.vr_bruto,
				vc.vr_liquido,
				vc.vr_desconto,
				vc.tp_desconto,
				vc.usuario_id,
				vc.status,
				vc.dt_cincronizacao,
				vc.ativo,
				fp.nome as nome_forma_pgto,
				pl.nome as nome_plano_pgto
			FROM 
				vendas_cobrancas as vc
				INNER JOIN vendas as vend ON (vend.id=vc.venda_id)
				INNER JOIN forma_pagamento as fp ON (fp.id=vc.forma_pagamento_id)
				INNER JOIN planos_pagamento as pl ON (pl.id=vc.plano_pagamento_id)
			`;
    let params = []//
    if(nome){
        sql += ` and p.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(plano_pagamento_id){   
        sql += ` and vc.plano_pagamento_id = ?  `;     
        params.push(plano_pagamento_id)     
    }

    if(forma_pagamento_id){   
        sql += ` and vc.forma_pagamento_id = ?  `;     
        params.push(forma_pagamento_id)     
    }

    if(id){        
       sql += ` and vc.id = ?  `;     
       params.push(id)           
    }

    if(venda_id){        
       sql += ` and vc.venda_id = ?  `;     
       params.push(venda_id)           
    }

    sql += ` WHERE vc.ativo="yes" and vend.ativo="yes" and fp.ativo="yes" and pl.ativo="yes" `; 
    sql += ` order by vc.id desc `; 

    let retorno = await connection
    .getRepository("VendasCobrancas")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneVendaCobranca = async ({nome, pessoa_id, filial_id, id})=>{
    const connection = getConnection();

    let retorno = await connection
    .getRepository("VendasCobrancas")
    .createQueryBuilder("vendas_cobrancas")
    .innerJoin("vendas_cobrancas.venda","venda","venda.id=vendas_cobrancas.venda_id")
    .select([
    		'vendas_cobrancas.id',
			'vendas_cobrancas.id_venda_cobranca_api',
			'vendas_cobrancas.forma_pagamento_id',
			'vendas_cobrancas.plano_pagamento_id',
			'vendas_cobrancas.operador_financeiro_id',
			'vendas_cobrancas.venda_id',
			'vendas_cobrancas.vr_bruto',
			'vendas_cobrancas.vr_liquido',
			'vendas_cobrancas.vr_desconto',
			'vendas_cobrancas.tp_desconto',
			'vendas_cobrancas.usuario_id',
			'vendas_cobrancas.status',
			'vendas_cobrancas.dt_cincronizacao',
			'vendas_cobrancas.ativo',

    ])
    .where("vendas_cobrancas.ativo = :ativo", {ativo: "yes" })
    .andWhere("venda.ativo = :ativo", {ativo: "yes" })
    //.getSql();
   
    if(plano_pagamento_id){  
    	retorno.andWhere("vendas_cobrancas.plano_pagamento_id = :plano_pagamento_id", {plano_pagamento_id: plano_pagamento_id})    
        
    }

    if(forma_pagamento_id){  
    	retorno.andWhere("vendas_cobrancas.forma_pagamento_id = :forma_pagamento_id", {forma_pagamento_id: forma_pagamento_id})    
        
    }

    if(venda_id){        
        retorno.andWhere("vendas_cobrancas.venda_id = :venda_id", {venda_id: venda_id})        
    }

    if(id){        
        retorno.andWhere("vendas_cobrancas.id = :id", {id: id})        
    }

    retorno.orderBy('vendas_cobrancas.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}


export const findeLastVendaCobranca = async ()=>{
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
    .getRepository("VendasCobrancas")
    .createQueryBuilder("vendas_cobrancas")
    .select([
    		'vendas_cobrancas.id',

    ])
    
    retorno.orderBy('vendas_cobrancas.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}

