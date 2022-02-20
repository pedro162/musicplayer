import {EntitySchema} from 'typeorm';

const Embalagem = new EntitySchema({
	name:'Embalagem',//Entity name (your "Model") 
	tableName:'embalagens',
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
		is_padrao:{
			type:'varchar',
			nullable:true,
			default:'no',
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

export default Embalagem;