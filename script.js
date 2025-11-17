 // Script para montar a mensagem e redirecionar para o WhatsApp -->
    
    // Captura o envio do formulário
    document.getElementById('formPedido').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        // Coleta os dados dos campos
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('telefone').value;
        var endereco = document.getElementById('endereco').value;
        var pizza = document.getElementById('pizza').value;
        var quantidade = document.getElementById('quantidade').value;
        var obs = document.getElementById('obs').value;

        // Monta a mensagem para o WhatsApp
        var mensagem = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nEndereço: ${endereco}\nPedido: ${quantidade} pizza(s) de ${pizza}.`;
        if(obs.trim() !== "") {
            mensagem += `\nObservações: ${obs}`;
        }

        // Codifica a mensagem para URL
        var mensagemCodificada = encodeURIComponent(mensagem);

        // Número da pizzaria (altere para o número correto se necessário)
        var numeroPizzaria = '5587981004878';

        // Monta o link do WhatsApp
        var linkWhatsapp = `https://wa.me/${numeroPizzaria}?text=${mensagemCodificada}`;

        // Redireciona para o WhatsApp
        window.open(linkWhatsapp, '_blank');
    });
 
        