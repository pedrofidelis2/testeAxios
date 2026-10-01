const readline = require('readline');
const Cliente = require('./cliente.js');

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cliente = new Cliente();

const ler = (pergunta) => {
    return new Promise(resolve => {
        leitor.question(pergunta, (input) => resolve(input));
    });
}

const menu = async () => {
    console.log("\n--- MENU ---");
    console.log("1-Listar 2-Incluir 3-Alterar 4-Excluir 0-Sair");
    const valor = await ler("Digite a opção desejada: ");
    return parseInt(valor, 10); // Substituído eval() por parseInt()
}

const obterDados = async () => {
    const nomeStr = await ler("Digite o nome do personagem: ");
    const ataqueStr = await ler("Digite o valor do ataque: ");
    const defesaStr = await ler("Digite o valor da defesa: ");
    
    // Substituído eval() por Number() ou parseInt()
    return [nomeStr, Number(ataqueStr), Number(defesaStr)]; 
}

const principal = async () => {
    let opcao;
    do { 
        opcao = await menu();

        if (opcao === 1) {
            const dados = await cliente.obterTodos();
            console.log("\n--- Personagens ---");
            for (let obj of dados) console.log(obj);
        }

        if (opcao === 2) {
            const [nome, ataque, defesa] = await obterDados();
            const res = await cliente.incluir(nome, ataque, defesa);
            console.log("Criado com sucesso:", res);
        }

        if (opcao === 3) {
            const idStr = await ler("Id para alterar: ");
            const id = parseInt(idStr, 10);
            
            const dados = await cliente.obter(id);
            console.log("Dados atuais:", dados);

            const [nome, ataque, defesa] = await obterDados();
            const res = await cliente.alterar(id, nome, ataque, defesa);
            console.log("Alterado com sucesso:", res);
        }

        if (opcao === 4) {
            const idStr = await ler("Id para excluir: ");
            const id = parseInt(idStr, 10);
            const res = await cliente.excluir(id);
            console.log("Excluído com sucesso:", res);
        }

    } while (opcao !== 0);
}

principal().then(() => leitor.close());