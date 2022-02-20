import {EntitySchema} from 'typeorm';

const VendasCobrancas = new EntitySchema({
	name:'VendasCobrancas',//Entity name (your "Model") 
	tableName:'vendas_cobrancas',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_venda_cobranca_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		forma_pagamento_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		plano_pagamento_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		operador_financeiro_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		venda_id:{
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
        venda: {
            target: "Vendas",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "venda_id", referencedColumnName:"id"}
            ]
        },
        forma_pagamento: {
            target: "FormaPagamento",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "forma_pagamento_id", referencedColumnName:"id"}
            ]
        },
        plano_pagamento: {
            target: "PlanosPagamento",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "plano_pagamento_id", referencedColumnName:"id"}
            ]
        },
        operador_financeiro: {
            target: "OperadorFinanceiro",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "operador_financeiro_id", referencedColumnName:"id"}
            ]
        },
    }
});

export default VendasCobrancas;