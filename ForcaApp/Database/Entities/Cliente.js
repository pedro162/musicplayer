import {EntitySchema} from 'typeorm';

const Cliente = new EntitySchema({
	name:'Cliente',//Entity name (your "Model") 
	tableName:'clientes',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
			nullable:true,
		},
		pessoa_id:{
			type:'int',
		},
		filial_id:{
			type:'int',
			nullable:true,
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
	},
	relations:{
        pessoa: {
            target:"Pessoa",
            type:"one-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_id", referencedColumnName:"id"}
            ]
        }
    }
});

export default Cliente;