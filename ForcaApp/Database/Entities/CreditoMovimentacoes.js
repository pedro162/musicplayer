import {EntitySchema} from 'typeorm';

const CreditoMovimentacoes = new EntitySchema({
	name:'CreditoMovimentacoes',//Entity name (your "Model") 
	tableName:'credito_movimentacoes',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
		},
		credito_cliente_id:{
			type:'int',
		},
		filial_id:{
			type:'int',
		},
		valor:{
			type:'decimal'
		},
		historico:{
			type:'varchar'
		},
		usuario_id:{
			type:'int',
			nullable:true,
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
        credito_cliente: {
            target: "CreditoCliente",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "credito_cliente_id", referencedColumnName:"id"}
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

export default CreditoMovimentacoes;