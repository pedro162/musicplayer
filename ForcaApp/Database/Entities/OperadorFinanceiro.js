import {EntitySchema} from 'typeorm';

const OperadorFinanceiro = new EntitySchema({
	name:'OperadorFinanceiro',//Entity name (your "Model") 
	tableName:'operador_financeiro',
	//target: Pessoa,
	columns:{
		id:{
			primary:true,
			type:'int',
			generate:true,//auto-generated
			//autoincrement:true
		},
		id_operador_financeiro_api:{
			type:'int',
			nullable:true,
			default:null,
		},
		pessoa_id:{
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
        pessoa: {
            target: "Pessoa",
            type: "one-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "pessoa_id", referencedColumnName:"id"}
            ]
        }
    }
});

export default OperadorFinanceiro;