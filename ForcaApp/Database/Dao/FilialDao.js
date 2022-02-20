import {getConnection} from 'typeorm';

export const getFilial = async ({nome, filial_id})=>{
	const connection = getConnection();
	/*
				,
				 ,
				 
			*/
    let sql = `SELECT 
    			fl.id,
				fl.ativo,
				fl.usuario_id,
				fl.id_api,
				pes.nome,
				pes.documento,
				pes.documento_complementar
			FROM 
				filiais as fl INNER JOIN pessoas pes ON (fl.pessoa_id=pes.id)
			WHERE 
				pes.ativo="yes" and fl.ativo="yes"`;
    let params = []
    if(nome){
        sql += ` and pes.nome LIKE ?  `;
        params.push(`%${nome}%`)
    }

    if(filial_id){   
        sql += ` and fl.id = ?  `;     
        params.push(filial_id)     
    }

    sql += ` order by fl.id desc `; 

    let retorno = await connection
    .getRepository("Filial")
    .query(sql, params)
    //.query(`ALTER TABLE "tabela_preco_pessoas" ADD COLUMN "estado_id" int default null`)
   
    //console.log('sql: '+retorno)

    return retorno;
	
}

export const findeOneFilial = async ({nome, produto_id, filial_id})=>{
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
    .getRepository("Filial")
    .createQueryBuilder("filiais")
    .innerJoin("filiais.pessoa","pessoa","pessoa.id=filiais.pessoa_id")
    .select([
    		'filiais.id',
			'filiais.ativo',
			'filiais.usuario_id',
			'filiais.id_api',
			'pessoa.nome',
			'pessoa.documento',
			'pessoa.documento_complementar'

    ])
    .where("filiais.ativo = :ativo", {ativo: "yes" })
    .andWhere("pessoa.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
        
        retorno.andWhere("pessoa.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    if(pessoa_id){        
        retorno.andWhere("filiais.pessoa_id = :pessoa_id", {pessoa_id: pessoa_id})        
    }

    if(filial_id){        
        retorno.andWhere("filiais.id = :filial_id", {filial_id: filial_id})        
    }

    retorno.orderBy('filiais.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}