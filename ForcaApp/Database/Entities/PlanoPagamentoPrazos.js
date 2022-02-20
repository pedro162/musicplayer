import {EntitySchema} from 'typeorm';

const PlanoPagamentoPrazos = new EntitySchema({
	name:'PlanoPagamentoPrazos',//Entity name (your "Model") 
	tableName:'vendas_cobrancas',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_prazo_forma_pgto_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		prazo_pagamento_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		plano_pagamento_id:{
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
        prazo_pagamento: {
            target: "PrazosPagamento",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "prazo_pagamento_id", referencedColumnName:"id"}
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

    }
});

export default PlanoPagamentoPrazos;