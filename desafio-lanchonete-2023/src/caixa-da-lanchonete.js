const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = {
            nome: "meu cardapio",
            cardapio: [
                { codigo: "cafe", descricao: "Café", valor: 3.00 },
                { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50 },
                { codigo: "suco", descricao: "Suco Natural", valor: 6.20 },
                { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.50 },
                { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
                { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
                { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
                { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
            ],
        };

        let valorTotal = 0;

        for (const itemPedido of itens) {
            const [pedido, quantidade] = itemPedido;

            const cardapioItem = cardapio.cardapio.find(item => item.codigo === pedido);

            if (!cardapioItem) {
                console.log(`Item inválido: ${pedido}`);
                return;
            }

            let valorItem = cardapioItem.valor * quantidade;

            if (quantidade === 0) {
                console.log(`Quantidade inválida para ${cardapioItem.descricao}`);
                return;
            }

            if (pedido === "chantily" || pedido === "queijo") {
                console.log("Item extra não pode ser pedido sem o principal");
                return;
            }

            valorTotal += valorItem;
        }

        switch (formaDePagamento) {
            case "dinheiro":
                valorTotal -= valorTotal * 0.05;
                break;
            case "credito":
            case "debito":
                valorTotal += valorTotal * 0.03;
                break;
            default:
                console.log("Forma de pagamento inválida!");
                return;
        }

        const valorFormatado = valorTotal.toFixed(2);
        return `R$ ${valorFormatado}`;
    }

    iniciarPedido() {
        const itensDoPedido = [];
        this.pedirItem(itensDoPedido);
    }

    pedirItem(itensDoPedido) {
        rl.question("Digite o código do item do pedido (ou 'fim' para encerrar): ", pedido => {
            if (pedido.toLowerCase() === "fim") {
                this.finalizarPedido(itensDoPedido);
            } else {
                rl.question(`Digite a quantidade de ${pedido}: `, quantidade => {
                    itensDoPedido.push([pedido, parseInt(quantidade)]);
                    this.pedirItem(itensDoPedido);
                });
            }
        });
    }

    finalizarPedido(itensDoPedido) {
        rl.question("Digite a forma de pagamento (dinheiro, credito, debito): ", formaDePagamento => {
            const valorTotal = this.calcularValorDaCompra(formaDePagamento, itensDoPedido);
            console.log(`Valor total: ${valorTotal}`);
            rl.close();
        });
    }
}

const caixa = new CaixaDaLanchonete();
caixa.iniciarPedido();
 
export { CaixaDaLanchonete };
