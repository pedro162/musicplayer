
import {getConnection} from 'typeorm';

export const getFormaPagamento = async ({nome, id})=>{
	const connection = getConnection();
	/*
				,
				 ,
				 
			*/
    let sql = `SELECT 
    			f.id,
    			f.id_forma_pagamento_api,
				f.nome,
				f.usuario_id,
				f.status,
				f.tipo,
				f.liberado,
				f.dt_criacao,
				f.dt_cincronizacao,
				f.ativo
			FROM 
				forma_pagamento as f
			WHERE 
				f.ativo="yes"`;
    let params = []
    if(nome){
        sql += ` and f.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(id){   
        sql += ` and f.id = ?  `;     
        params.push(id)     
    }

    sql += ` order by f.id desc `; 

    let retorno = await connection
    .getRepository("FormaPagamento")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneFormaPagamento = async ({nome, pessoa_id, filial_id, id})=>{
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
    .getRepository("FormaPagamento")
    .createQueryBuilder("vendas")
    .innerJoin("vendas.pessoa","pessoa","pessoa.id=vendas.pessoa_id")
    .select([
    		'vendas.id',
			'vendas.obs_interna',
			'vendas.obs_nf',
			'vendas.status',
			'vendas.pessoa_vendedor_id',
			'vendas.ativo',
			'vendas.usuario_id',
			'vendas.id_api',
			'vendas.nf_id',
			'vendas.vr_bruto',
			'vendas.vr_liquido',
			'vendas.vr_desconto',
			'vendas.tp_desconto',
			'vendas.endereco_entrega_id',
			'vendas.pessoa_cancel_id',
			'vendas.solicita_desconto',
			'vendas.aprova_recusa_desconto',
			'vendas.pessoa_libera_desconto_id',
			'vendas.filial_id',
			'vendas.pessoa_id',
			'vendas.rca_vendedor',
			'vendas.status_faturamento',
			'vendas.status_entrega',
			'vendas.dt_faturamento',
			'vendas.dt_cancelamento',
			'vendas.dt_cincronizacao',
			'pessoa.nome',
			'pessoa.documento',
			'pessoa.documento_complementar'

    ])
    .where("vendas.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("pessoa.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(pessoa_id){        
        retorno.andWhere("vendas.pessoa_id = :pessoa_id", {pessoa_id: pessoa_id})        
    }

    if(filial_id){        
        retorno.andWhere("vendas.filial_id = :filial_id", {filial_id: filial_id})        
    }

    if(id){        
        retorno.andWhere("vendas.id = :id", {id: id})        
    }

    retorno.orderBy('vendas.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}

export const findeLastFormaPagamento = async ()=>{
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
    .getRepository("FormaPagamento")
    .createQueryBuilder("forma_pagamento")
    .select([
    		'forma_pagamento.id',

    ])
    
    retorno.orderBy('forma_pagamento.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}