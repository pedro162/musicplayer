import {EntitySchema} from 'typeorm';

const PlanosPagamento = new EntitySchema({
	name:'PlanosPagamento',//Entity name (your "Model") 
	tableName:'planos_pagamento',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_plano_pagamento_api:{
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

export default PlanosPagamento;