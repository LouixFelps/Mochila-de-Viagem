const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')

const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento)=>{
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    
        const itemAtual = {
            'nome': nome.value,
            'quantidade': quantidade.value
        }
    
    const existe = itens.find(elemento => elemento.nome === nome.value)
    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0;

        criaElemento(itemAtual)
    
    
        itens.push(itemAtual)
    }

    localStorage.setItem('itens', JSON.stringify(itens))
    


    nome.value = ''
    quantidade.value = ''
})

function criaElemento(item){
   

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')
    
    const numero = document.createElement('strong')
    numero.innerHTML = item.quantidade
    numero.dataset.id = item.id
    
    novoItem.appendChild(numero)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)

    novoItem.appendChild(botaoDeleta(item.id))

}



function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id)
    }
    )
    
    return elementoBotao
}


function atualizaElemento(item){

    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id) , 1)
    localStorage.setItem('itens', JSON.stringify(itens))

}