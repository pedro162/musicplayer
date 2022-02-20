
import {getConnection} from 'typeorm';

export const getVenda = async ({nome, status, filial_id, id})=>{
	const connection = getConnection();
	/*
				,
				 ,
				 
			*/
    let sql = `SELECT 
    			vend.id,
    			vend.obs_interna,
				vend.obs_nf,
				vend.status,
				vend.pessoa_vendedor_id,
				vend.ativo,
				vend.usuario_id,
				vend.id_api,
				vend.nf_id,
				vend.vr_bruto,
				vend.vr_liquido,
				vend.vr_desconto,
				vend.tp_desconto,
				vend.endereco_entrega_id,
				vend.pessoa_cancel_id,
				vend.solicita_desconto,
				vend.aprova_recusa_desconto,
				vend.pessoa_libera_desconto_id,
				vend.filial_id,
				vend.pessoa_id,
				vend.rca_vendedor,
				vend.status_faturamento,
				vend.status_entrega,
				vend.dt_faturamento,
				vend.dt_cancelamento,
				vend.dt_cincronizacao,
				pes.nome,
				pes.documento,
				pes.documento_complementar
			FROM 
				vendas as vend INNER JOIN pessoas pes ON (vend.pessoa_id=pes.id)
				LEFT JOIN pessoas pes_vend ON (vend.pessoa_vendedor_id=pes_vend.id)
				INNER JOIN filiais fl ON (vend.filial_id=fl.id)

			WHERE 
				pes.ativo="yes" and vend.ativo="yes"`;
    let params = []
    if(nome){
        sql += ` and pes.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(filial_id){   
        sql += ` and vend.filial_id = ?  `;     
        params.push(filial_id)     
    }

    if(id){   
        sql += ` and vend.id = ?  `;     
        params.push(id)     
    }

    if(status){   
        sql += ` and vend.status = ?  `;     
        params.push(status)     
    }

    sql += ` order by vend.id desc `; 

    let retorno = await connection
    .getRepository("Vendas")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneVenda = async ({nome, pessoa_id, filial_id, id})=>{
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
    .getRepository("Vendas")
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

export const findeLastVenda = async ()=>{
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
    .getRepository("Vendas")
    .createQueryBuilder("vendas")
    .select([
    		'vendas.id',

    ])
    
    retorno.orderBy('vendas.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}