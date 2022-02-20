import {EntitySchema} from 'typeorm';

const CreditoCliente = new EntitySchema({
	name:'CreditoCliente',//Entity name (your "Model") 
	tableName:'credito_clientes',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
		},
		vr_saldo:{
			type:'decimal'
		},
		tp_credito:{
			type:'varchar'
		},
		filial_id:{
			type:'int',
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

export default CreditoCliente;