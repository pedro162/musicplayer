import {EntitySchema} from 'typeorm';

const Pessoa = new EntitySchema({
	name:'Pessoa',//Entity name (your "Model") 
	tableName:'pessoas',
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
		},
		nome:{
			type:'varchar',
		},
		sobrenome:{
			type:'varchar',
			nullable:true,
		},
		documento:{
			type:'varchar',
		},
		documento_complementar:{
			type:'varchar',
			nullable:true,
		},
		filial_id:{
			type:'int',
			nullable:true,
		},
		usuario_id:{
			type:'int',
			nullable:true,
		},
		status:{
			type:'varchar',
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
		}
	}
});

export default Pessoa;