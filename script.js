

// Usamos o DOMContentLoaded para garantir que o navegador leu todo o HTML antes do JS rodar
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Definição das variáveis globais do sistema
    let carrinho = [];
    const listaPizzasElement = document.getElementById('lista-pizzas');
    const valorTotalElement = document.getElementById('valor-total');
    const bairroSelect = document.getElementById('bairro');

    // 2. Evento para atualizar o total quando o bairro mudar
    if (bairroSelect) {
        bairroSelect.addEventListener('change', atualizarInterface);
    }

    // 3. Captura cliques nos botões do cardápio
    document.querySelectorAll('.btn-adicionar-pedido').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const nome = this.getAttribute('data-pizza');
            const preco = parseFloat(this.getAttribute('data-preco').replace(',', '.'));
            
            carrinho.push({ nome, preco });
            atualizarInterface();
            
            // Feedback visual: rola até o carrinho
            document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. Função principal de atualização (Coração do sistema)
    function atualizarInterface() {
        if (!listaPizzasElement || !valorTotalElement) return;

        listaPizzasElement.innerHTML = '';
        let subtotal = 0;

        if (carrinho.length === 0) {
            listaPizzasElement.innerHTML = '<li style="color: #666; font-style: italic;">Seu carrinho está vazio</li>';
        }

        carrinho.forEach((item, index) => {
            subtotal += item.preco;
            const li = document.createElement('li');
            li.className = 'item-carrinho';
            li.innerHTML = `
                <span>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                <button type="button" class="btn-remover" data-index="${index}">X</button>
            `;
            listaPizzasElement.appendChild(li);
        });

        // Cálculo da Taxa
        const opcaoSelecionada = bairroSelect.options[bairroSelect.selectedIndex];
        const taxaEntrega = parseFloat(opcaoSelecionada.getAttribute('data-taxa')) || 0;
        const totalGeral = subtotal + taxaEntrega;

        // Atualiza os valores na tela
        valorTotalElement.innerText = totalGeral.toFixed(2).replace('.', ',');
        window.taxaAtual = taxaEntrega; // Guarda para o WhatsApp
    }

    // 5. Delegar evento de remover (para funcionar em botões criados dinamicamente)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-remover')) {
            const index = e.target.getAttribute('data-index');
            carrinho.splice(index, 1);
            atualizarInterface();
        }
    });

    // 6. Envio do Formulário para WhatsApp
    const form = document.getElementById('formPedido');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (carrinho.length === 0) {
                alert("O seu carrinho está vazio!");
                return;
            }

            const nomeCliente = document.getElementById('nome').value;
            const endereco = document.getElementById('endereco').value;
            const bairroNome = bairroSelect.options[bairroSelect.selectedIndex].text;
            const obs = document.getElementById('obs').value;
            const totalFinal = valorTotalElement.innerText;

            let itensTexto = "";
            carrinho.forEach((item) => {
                itensTexto += `\n- ${item.nome}: R$ ${item.preco.toFixed(2).replace('.', ',')}`;
            });

            const mensagem = `🍕 *SOS PIZZA - PEDIDO* 🍕\n\n` +
                             `*Cliente:* ${nomeCliente}\n` +
                             `*Endereço:* ${endereco}\n` +
                             `*Local:* ${bairroNome}\n` +
                             `-----------------------------\n` +
                             `*Itens:*${itensTexto}\n` +
                             `-----------------------------\n` +
                             `*Taxa:* R$ ${window.taxaAtual.toFixed(2).replace('.', ',')}\n` +
                             `*TOTAL:* R$ ${totalFinal}\n\n` +
                             `*OBS:* ${obs || 'Nenhuma'}`;

            window.open(`https://wa.me/5587981004878?text=${encodeURIComponent(mensagem)}`, '_blank');
        });
    }
});