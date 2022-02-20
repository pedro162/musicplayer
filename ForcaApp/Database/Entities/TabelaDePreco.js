import {EntitySchema} from 'typeorm';

const TabelaDePreco = new EntitySchema({
	name:'TabelaDePreco',//Entity name (your "Model") 
	tableName:'tabela_de_precos',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		estado_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		nome:{
			type:'varchar',
		},
		usuario_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		status:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		is_referencia:{
			type:'varchar',
			nullable:true,
			default:'no',
		},
		table_refencia_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		dt_cincronizacao:{
			type:'date',
			nullable:true,
			default:null,
		},
		ativo:{
			type:'varchar',
			default:'yes',
		},
	}
});

export default TabelaDePreco;