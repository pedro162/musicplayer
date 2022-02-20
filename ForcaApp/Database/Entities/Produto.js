import {EntitySchema} from 'typeorm';

const Produto = new EntitySchema({
	name:'Produto',//Entity name (your "Model") 
	tableName:'produtos',
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
		filial_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		marca_id:{
			type:'int',
			nullable:true,
			default:null,
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
        marca: {
            target: "Marca",
            type: "one-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "marca_id", referencedColumnName:"id"}
            ]
        },
        estoque: {
            target: "Estoque",
            type: "one-to-many",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "id", referencedColumnName:"produto_id"}
            ]
        }
    }
});

export default Produto;