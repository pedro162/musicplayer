import {getConnection} from 'typeorm';

export const getPessoa = async ({nome})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();
    if(nome){
    	const retorno = await connection
		.getRepository("Pessoa")
		.createQueryBuilder("pessoa")
		.select(['pessoa.id', 'pessoa.nome', 'pessoa.id_api', 'pessoa.documento','pessoa.documento_complementar', 'pessoa.status'])
        .where("pessoa.ativo = :ativo", {ativo: "yes" })
        .andWhere("pessoa.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('pessoa.id', 'DESC')
        .getMany()

        console.log('----------------- tesre')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("Pessoa")
		.createQueryBuilder("pessoa")
		.select(['pessoa.id', 'pessoa.nome', 'pessoa.id_api', 'pessoa.documento','pessoa.documento_complementar', 'pessoa.status'])
        .where("pessoa.ativo = :ativo", {ativo: "yes" })
        .orderBy('pessoa.id', 'DESC')
        .getMany()
        
        console.log('----------------- tesre')
    	console.log(retorno)
        return retorno;
    }

   
    //console.log('sql: '+retorno)
	
}


export const findeOnePessoa = async ({nome, id})=>{
    const connection = getConnection();

    let retorno = await connection
    .getRepository("Pessoa")
    .createQueryBuilder("pessoa")
    .select(['pessoa.id', 'pessoa.nome', 'pessoa.id_api', 'pessoa.documento','pessoa.documento_complementar', 'pessoa.status'])
    .where("pessoa.ativo = :ativo", {ativo: "yes" })
    //.getSql();
   
    if(id){        
        retorno.andWhere("pessoa.id = :id", {id: id})        
    }

    retorno.orderBy('pessoa.id', 'DESC')
    retorno = retorno.getOne();
    return retorno;

    
}


export const findeLastPessoa = async ()=>{
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
    .getRepository("Pessoa")
    .createQueryBuilder("pessoa")
    .select([
            'pessoa.id',

    ])
    
    retorno.orderBy('pessoa.id', 'DESC')
    retorno.limit('1')
    retorno = retorno.getOne();
    return retorno;

    
}
