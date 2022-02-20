import {getConnection} from 'typeorm';

export const getOperadorFinanceiro = async ({nome, id, pessoa_id})=>{
	const connection = getConnection();
	/*
				,
				 ,
				 
			*/
    let sql = `SELECT 
    			op.id,
    			op.id_operador_financeiro_api,
				op.pessoa_id,
				op.usuario_id,
				op.status,
				op.dt_cincronizacao,
				op.ativo,
				p.nome
			FROM 
				operador_financeiro as op
				INNER JOIN pessoas as p ON(p.id = op.pessoa_id)
			`;
    let params = []
    if(nome){
        sql += ` and p.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(pessoa_id){        
        retorno.andWhere("op.pessoa_id = :pessoa_id", {pessoa_id: pessoa_id})        
    }

    if(id){   
        sql += ` and op.id = ?  `;     
        params.push(id)     
    }
    sql += ` WHERE op.ativo="yes" AND p.ativo="yes" `; 
    sql += ` order by op.id desc `; 

    let retorno = await connection
    .getRepository("OperadorFinanceiro")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneOperadorFinanceiro = async ({nome, pessoa_id, filial_id, id})=>{
    const connection = getConnection();

    let retorno = await connection
    .getRepository("OperadorFinanceiro")
    .createQueryBuilder("operador_financeiro")
    .innerJoin("operador_financeiro.pessoa","pessoa","pessoa.id=operador_financeiro.pessoa_id")
    .select([
    		'operador_financeiro.id',
			'operador_financeiro.id_operador_financeiro_api',
			'operador_financeiro.pessoa_id',
			'operador_financeiro.usuario_id',
			'operador_financeiro.status',
			'operador_financeiro.dt_cincronizacao',
			'operador_financeiro.ativo',
			'pessoa.nome',
			'pessoa.documento',
			'pessoa.documento_complementar'

    ])
    .where("operador_financeiro.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("pessoa.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(pessoa_id){        
        retorno.andWhere("operador_financeiro.pessoa_id = :pessoa_id", {pessoa_id: pessoa_id})        
    }

    if(id){        
        retorno.andWhere("operador_financeiro.id = :id", {id: id})        
    }

    retorno.orderBy('operador_financeiro.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}

export const findeLastOperadorFinanceiro = async ()=>{
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
    .getRepository("OperadorFinanceiro")
    .createQueryBuilder("operador_financeiro")
    .select([
    		'operador_financeiro.id',

    ])
    
    retorno.orderBy('operador_financeiro.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}