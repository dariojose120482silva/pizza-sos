
document.addEventListener('DOMContentLoaded', function() {

    const campoPizza = document.getElementById('pizza');
    const secaoPedido = document.getElementById('pedido'); 
    
    // 🚨 NOVO: Referência para o campo oculto do preço (adicionado no HTML)
    const campoPreco = document.getElementById('preco'); 
    
    // 1. === INTERCEPTA O CLIQUE EM TODOS OS BOTÕES ===
    document.querySelectorAll('.btn-adicionar-pedido').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            // 🚨 MUDANÇA 1: LÊ O NOME DA PIZZA E O PREÇO DO BOTÃO CLICADO
            const itemSelecionado = this.getAttribute('data-pizza'); 
            const precoSelecionado = this.getAttribute('data-preco');

            // Verifica se todos os elementos necessários existem
            if (itemSelecionado && campoPizza && secaoPedido && campoPreco) {
                
                // 1. Preenche o campo de texto visível com o nome e tamanho
                campoPizza.value = itemSelecionado;
                
                // 2. Preenche o campo oculto com o preço
                campoPreco.value = precoSelecionado; 

                // 3. Rola para a seção do pedido
                setTimeout(() => {
                    secaoPedido.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 10);
            }
        });
    });

    // 2. === CÓDIGO DE ENVIO DO WHATSAPP ===
    
    document.getElementById('formPedido').addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('telefone').value;
        var endereco = document.getElementById('endereco').value;
        var pizza = document.getElementById('pizza').value;
        var quantidade = document.getElementById('quantidade').value;
        
        // 🚨 MUDANÇA 2: LÊ O PREÇO DO CAMPO OCULTO
        var preco = document.getElementById('preco').value; 
        
        var obs = document.getElementById('obs').value;

        // 🚨 MUDANÇA 3: INCLUI O PREÇO NA MENSAGEM FINAL
        var mensagem = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nEndereço: ${endereco}\nPedido: ${quantidade} pizza(s) de ${pizza}. Total estimado: R$ ${preco}.`;
        
        if(obs.trim() !== "") {
            mensagem += `\nObservações: ${obs}`;
        }

        var mensagemCodificada = encodeURIComponent(mensagem);
        var numeroPizzaria = '5587981004878';
        var linkWhatsapp = `https://wa.me/${numeroPizzaria}?text=${mensagemCodificada}`;

        window.open(linkWhatsapp, '_blank');
    });
});