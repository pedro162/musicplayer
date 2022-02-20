import {EntitySchema} from 'typeorm';

const Filial = new EntitySchema({
	name:'Filial',//Entity name (your "Model") 
	tableName:'filiais',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		pessoa_id:{
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
	},
	relations:{
        pessoa: {
            target: "Pessoa",
            type: "one-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_id", referencedColumnName:"id"}
            ]
        }
    }
});

export default Filial;
