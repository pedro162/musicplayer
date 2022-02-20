import {EntitySchema} from 'typeorm';

const Estoque = new EntitySchema({
	name:'Estoque',//Entity name (your "Model") 
	tableName:'estoques',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
		},
		quantidade:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		quantidade_orc:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		disponivel:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		avariado:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		bloqueado:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		reservado:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		filial_id:{
			type:'int',
		},		
		produto_id:{
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
        filial: {
            target: "Filial",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "filial_id", referencedColumnName:"id"}
            ]
        },
        produto: {
            target: "Produto",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "produto_id", referencedColumnName:"id"}
            ]
        },
    }
});

export default Estoque;