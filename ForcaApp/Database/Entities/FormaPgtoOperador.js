import {EntitySchema} from 'typeorm';

const FormaPgtoOperador = new EntitySchema({
	name:'FormaPgtoOperador',//Entity name (your "Model") 
	tableName:'forma_pgto_operador',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_forma_pgto_operador_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		usuario_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		operador_financeiro_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		forma_pagamento_id:{
			type:'int',
			nullable:true,
			default:null,
		},
		status:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		dt_criacao:{
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
        
        operador: {
            target: "OperadorFinanceiro",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "operador_financeiro_id", referencedColumnName:"id"}
            ]
        },
        forma_pgto: {
            target: "FormaPagamento",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "forma_pagamento_id", referencedColumnName:"id"}
            ]
        },

    }
});

export default FormaPgtoOperador;