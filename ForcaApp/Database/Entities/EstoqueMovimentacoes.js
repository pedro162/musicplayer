import {EntitySchema} from 'typeorm';

const EstoqueMovimentacoes = new EntitySchema({
	name:'EstoqueMovimentacoes',//Entity name (your "Model") 
	tableName:'estoque_movimentacoes',
	columns:{
		id:{
			primary:true,
			type:'int',
			generated:true,//auto-generated
		},
		id_api:{
			type:'int',
			nullable:true,
		},
		historico:{
			type:'varchar',
			nullable:true,
			default:null,
		},
		quantidade:{
			type:'decimal',
		},
		filial_id:{
			type:'int',
		},
		estoque_id:{
			type:'int',
		},
		tipo_movimentacao:{
			type:'varchar',
			//enum:['vendas', 'entrada_nota','devolucao_fornecedor','devolucao_cliente', 'ajuste', 'outros'],
			default:'vendas',
		},
		id_referencia_api:{
			type:'int',
			nullable:true,
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
		},
		data:{
			type:'date',
			nullable:true,
			default:null,
		}
	},
	relations:{
        estoque: {
            target: "Estoque",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn:[
            	{name: "estoque_id", referencedColumnName:"id"}
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

export default EstoqueMovimentacoes;