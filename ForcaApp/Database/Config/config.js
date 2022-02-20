import * as SQLite from 'expo-sqlite';
import Cliente from '../Entities/Cliente.js';
import Pessoa from '../Entities/Pessoa.js';
import Filial from '../Entities/Filial.js';
import Estoque from '../Entities/Estoque.js';
import CreditoCliente from '../Entities/CreditoCliente.js';
import CreditoMovimentacoes from '../Entities/CreditoMovimentacoes.js';
import EstoqueMovimentacoes from '../Entities/EstoqueMovimentacoes.js';
import Usuario from '../Entities/Usuario.js';
import Embalagem from '../Entities/Embalagem.js';
import EmbalagemProduto from '../Entities/EmbalagemProduto.js';
import Marca from '../Entities/Marca.js';
import Produto from '../Entities/Produto.js';
import TabelaDePreco from '../Entities/TabelaDePreco.js';
import TabelaPrecoProduto from '../Entities/TabelaPrecoProduto.js';
import Vendas from '../Entities/Vendas.js';
import VendasProdutos from '../Entities/VendasProdutos.js';
import FormaPagamento from '../Entities/FormaPagamento.js';
import OperadorFinanceiro from '../Entities/OperadorFinanceiro.js';
import FormaPgtoOperador from '../Entities/FormaPgtoOperador.js';
import PlanosPagamento from '../Entities/PlanosPagamento.js';
import PrazosPagamento from '../Entities/PrazosPagamento.js';
import PlanoPagamentoPrazos from '../Entities/PlanoPagamentoPrazos.js';
import VendasCobrancas from '../Entities/VendasCobrancas.js';
import Teste1639880086945 from '../../../1639880086945-Teste.js'

const config = {
	database:'mydatabase_0001',//05
	driver:SQLite,
	entities:[Cliente, Pessoa, Filial, Estoque, CreditoCliente, CreditoMovimentacoes, EstoqueMovimentacoes, Usuario, Embalagem, EmbalagemProduto, Marca, Produto, TabelaDePreco, TabelaPrecoProduto, Vendas, VendasProdutos, FormaPagamento,OperadorFinanceiro, FormaPgtoOperador, PlanosPagamento, PrazosPagamento, PlanoPagamentoPrazos, VendasCobrancas],//your entities will be added here 
	synchronize:true,//false
	migrationsRun:true,
	type:'expo',
	migrations: [Teste1639880086945],
    cli: {
        "migrationsDir": "migration"
    }
}

export default config;