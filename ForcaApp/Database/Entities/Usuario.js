import {EntitySchema} from 'typeorm';

const Usuario = new EntitySchema({
	name:'Usuario',//Entity name (your "Model") 
	tableName:'usuarios',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
		},
		pessoa_id:{
			type:'int',
		},
		status_usuairo:{
			type:'varchar'
		},
		filial_id:{
			type:'int',
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

export default Usuario;