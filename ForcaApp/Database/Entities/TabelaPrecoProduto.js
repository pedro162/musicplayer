import {EntitySchema} from 'typeorm';

const TabelaPrecoProduto = new EntitySchema({
	name:'TabelaPrecoProduto',//Entity name (your "Model") 
	tableName:'tabela_preco_produtos',
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
		tabela_preco_id:{
			type:'int',
		},
		filial_id:{
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
        tabela_de_preco: {
            target: "TabelaDePreco",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "tabela_preco_id", referencedColumnName:"id"}
            ]
        },
        filial: {
            target: "Filial",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "filial_id", referencedColumnName:"id"}
            ]
        }
    }
});

export default TabelaPrecoProduto;