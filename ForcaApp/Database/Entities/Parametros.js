
import {EntitySchema} from 'typeorm';

const Parametros = new EntitySchema({
	name:'Parametros',//Entity name (your "Model") 
	tableName:'parametros',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
		},
		descricai:{
			type:'varchar',
		},
		tipo:{
			type:'varchar',
		},
		valor:{
			type:'varchar',
		},
		filial_id:{
			type:'int',
		},
		usuario_id:{
			type:'int',
			nullable:true,
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

export default Parametros;