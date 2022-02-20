import {getConnection} from 'typeorm';

export const getEmbalagem = async ({nome})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();
    if(nome){
    	const retorno = await connection
		.getRepository("Embalagem")
		.createQueryBuilder("embalagem")
		.select(['embalagem.id', 'embalagem.nome', 'embalagem.id_api', 'embalagem.status'])
        .where("embalagem.ativo = :ativo", {ativo: "yes" })
        .andWhere("embalagem.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('embalagem.id', 'DESC')
        .getMany()

        console.log('----------------- embalagem')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("Embalagem")
		.createQueryBuilder("embalagem")
		.select(['embalagem.id', 'embalagem.nome', 'embalagem.id_api','embalagem.status'])
        .where("embalagem.ativo = :ativo", {ativo: "yes" })
        .orderBy('embalagem.id', 'DESC')
        .getMany()
        
        console.log('----------------- embalagem')
    	console.log(retorno)
        return retorno;
    }

   
    //console.log('sql: '+retorno)
	
}