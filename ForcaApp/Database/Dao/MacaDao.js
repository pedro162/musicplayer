import {getConnection} from 'typeorm';

export const getMarca = async ({nome})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();
    if(nome){
    	const retorno = await connection
		.getRepository("Marca")
		.createQueryBuilder("marca")
		.select(['marca.id', 'marca.nome', 'marca.id_api', 'marca.status'])
        .where("marca.ativo = :ativo", {ativo: "yes" })
        .andWhere("marca.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('marca.id', 'DESC')
        .getMany()

        console.log('----------------- marca')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("Marca")
		.createQueryBuilder("marca")
		.select(['marca.id', 'marca.nome', 'marca.id_api','marca.status'])
        .where("marca.ativo = :ativo", {ativo: "yes" })
        .orderBy('marca.id', 'DESC')
        .getMany()
        
        console.log('----------------- marca')
    	console.log(retorno)
        return retorno;
    }

   
    //console.log('sql: '+retorno)
	
}