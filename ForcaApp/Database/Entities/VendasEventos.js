import {EntitySchema} from 'typeorm';

const VendasEventos = new EntitySchema({
	name:'VendasEventos',//Entity name (your "Model") 
	tableName:'vendas_eventos',
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
		venda_id:{
			type:'int',
		},
		obs_interna:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		obs_nf:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		filial_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		pessoa_id:{
			type:'int',
		},
		pessoa_vendedor_id:{
			type:'int',
		},
		rca_vendedor:{
			type:'int',
			nullable:true,
			default:null,
		},
		nf_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		tp_doc:{
			type:'varchar',
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
		endereco_entrega_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		pessoa_cancel_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		solicita_desconto:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		aprova_recusa_desconto:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		pessoa_libera_desconto_id:{
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
		status_faturamento:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		status_entrega:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		dt_faturamento:{
			type:'date',
			nullable:true,
			default:null,
		},
		dt_cancelamento:{
			type:'date',
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
       filial: {
            target: "Filial",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "filial_id", referencedColumnName:"id"}
            ]
        },
        pessoa: {
            target: "Pessoa",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_id", referencedColumnName:"id"}
            ]
        },
        pessoa_vendedor: {
            target: "Pessoa",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_vendedor_id", referencedColumnName:"id"}
            ]
        },
        pessoa_libera_desconto: {
            target: "Pessoa",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_libera_desconto_id", referencedColumnName:"id"}
            ]
        },
        pessoa_cancel_venda: {
            target: "Pessoa",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_cancel_id", referencedColumnName:"id"}
            ]
        } 

    }
});

export default VendasEventos;