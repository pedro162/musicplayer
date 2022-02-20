
import {EntitySchema} from 'typeorm';

const EmbalagemProduto = new EntitySchema({
	name:'EmbalagemProduto',//Entity name (your "Model") 
	tableName:'embalagem_produtos',
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
			nullable:true,
			default:null,
		},
		produto_id:{
			type:'int',
		},
		embalagem_id:{
			type:'int',
		},
		usuario_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		vr_preco:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		vr_preco_min:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		tp_embalagem:{
			type:'varchar',
			nullable:true,
			default:"venda",
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
        produto: {
            target: "Produto",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "produto_id", referencedColumnName:"id"}
            ]
        },
        embalagem: {
            target: "Embalagem",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "embalagem_id", referencedColumnName:"id"}
            ]
        }
    }
});

export default EmbalagemProduto;