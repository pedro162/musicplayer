import {EntitySchema} from 'typeorm';

const VendasProdutos = new EntitySchema({
	name:'VendasProdutos',//Entity name (your "Model") 
	tableName:'vendas_produtos',
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
		produto_id:{
			type:'int',
		},
		venda_id:{
			type:'int',
		},
		embalagem_id:{
			type:'int',
		},
		qtd:{
			type:'int',
		},
		qtd_devolvido:{
			type:'int',
			nullable:true,
			default:null,
		},
		vr_bruto:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		vr_liquido:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		vr_desconto:{
			type:'decimal',
			nullable:true,
			default:0,
		},
		tp_desconto:{
			type:'varchar',
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
        
        produto: {
            target: "Produto",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "produto_id", referencedColumnName:"id"}
            ]
        },
        venda: {
            target: "Vendas",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "venda_id", referencedColumnName:"id"}
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

export default VendasProdutos;