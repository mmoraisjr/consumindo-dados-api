// var consultaCEP = fetch('https://viacep.com.br/ws/99999999/json/')
//   .then(resposta => resposta.json())
//   .then(r => {
//     if (r.erro) {
//         throw Error('CEP Inexistente')
//     } else 
//         console.log(r)
//   })
//   .catch(erro => console.log(erro))
//   .finally(mensagem => console.log("Processamento concluído"));

// console.log(consultaCEP);

async function buscaEndereco(cep) {
  var mensagemErro = document.querySelector("#erro")
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.r) {
      throw Error('CEP não existe')
    }

    var endereco = document.querySelector("#endereco");
    var bairro = document.querySelector("#bairro");
    var cidade = document.querySelector("#cidade");
    var estado = document.querySelector("#estado");

    endereco.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    cidade.value = consultaCEPConvertida.localidade;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (r) {
    mensagemErro.innerHTML = `<p>CEP INVÁLIDO! Tente Novamente</p>`;
  }
}

// let ceps = ['72650035','72210264']
// let conjuntoCEPS = ceps.map(valores => buscaEndereco(valores));
// console.log(conjuntoCEPS);
// Promise.all(conjuntoCEPS).then(respostas => console.log(respostas));


const cep = document.querySelector("#cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));