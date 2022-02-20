import {getConnection} from 'typeorm';

export const getTabelaPreco = async ({nome})=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();

    let retorno = await connection
	.getRepository("TabelaDePreco")
	.createQueryBuilder("tabela_de_precos")
	.select(['tabela_de_precos.id', 'tabela_de_precos.nome', 'tabela_de_precos.id_api', 'tabela_de_precos.status', 'tabela_de_precos.estado_id'])
    .where("tabela_de_precos.ativo = :ativo", {ativo: "yes" })
    //.getSql();
    if(nome){
    	
        retorno.andWhere("tabela_de_precos.nome LIKE :nome", {nome: `%${nome}%` })
        
    }

    retorno.orderBy('tabela_de_precos.id', 'DESC')
    retorno = retorno.getMany();
    return retorno;





    /*if(nome){
    	const retorno = await connection
		.getRepository("TabelaDePreco")
		.createQueryBuilder("tabela_de_precos")
		.select(['tabela_de_precos.id', 'tabela_de_precos.nome', 'tabela_de_precos.id_api', 'tabela_de_precos.status'])
        .where("tabela_de_precos.ativo = :ativo", {ativo: "yes" })
        .andWhere("tabela_de_precos.nome LIKE :nome", {nome: `%${nome}%` })
        .orderBy('tabela_de_precos.id', 'DESC')
        .getMany()

        console.log('----------------- tabela_de_precos')
    	console.log(retorno)

        return retorno;
    }else{
    	const retorno = await connection
		.getRepository("TabelaDePreco")
		.createQueryBuilder("tabela_de_precos")
		.select(['tabela_de_precos.id', 'tabela_de_precos.nome', 'tabela_de_precos.id_api','tabela_de_precos.status'])
        .where("tabela_de_precos.ativo = :ativo", {ativo: "yes" })
        .orderBy('tabela_de_precos.id', 'DESC')
        .getMany()
        
        console.log('----------------- tabela_de_precos')
    	console.log(retorno)
        return retorno;
    }

   */
    //console.log('sql: '+retorno)
	
}

export const updateTabelaPreco = async ()=>{
	const connection = getConnection();

	//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
	//return retorno;
	
    //.getSql();

    let retorno = await connection
	.getRepository("TabelaDePreco")
	.query(`UPDATE "tabela_de_precos" set estado_id=1 where id=1`)
	//.query(`ALTER TABLE "tabela_de_precos" ADD COLUMN "estado_id" int default null`)
    


	
}