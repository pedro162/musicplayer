import {EntitySchema} from 'typeorm';

const FormaPagamento = new EntitySchema({
	name:'FormaPagamento',//Entity name (your "Model") 
	tableName:'forma_pagamento',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_forma_pagamento_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		nome:{
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
		tipo:{//5:cartao, 4:boleto, 3:cheque, 2:credito_cliente, 1:dinheiro
			type:'int',
			nullable:true,
			default:null,
		},
		liberado:{//Se a cobrança está liberada para ser usada - 1:Sim, 0:Não
			type:'int',
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
	}
});

export default FormaPagamento;