
const content = document.querySelector('.content')
const selectUF = document.querySelector('#uf')
const selectDate = document.querySelector('input[type = date')

// buscar os estados e preencher as opções do input ufs
const ufs =fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
.then(resposta => resposta.json())
.then(state =>{
    for (const iterator of state) {
        selectUF.innerHTML += `<option value="${iterator.id}">${iterator.nome}</option>`
    }  
} )

// buscar as cidades e preencher o input citys
const selectCity = document.querySelector('#citys')
const citys = (event) => {
    const idUF = event.target.value
    selectCity.innerHTML = `<option value="0">Selecione uma cidade</option>`
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUF}/municipios`)
    .then(resultado => resultado.json())
    .then(city => {
        for (const iterator of city) {
            selectCity.innerHTML += `<option value="${iterator.id}">${iterator.nome}</option>`
        }
    })
}

//execulta uma ação quando mudar a opção do input ufs
selectUF.addEventListener('change', citys)


const form = document.querySelector('#form')

//clona um elemento
const cloneElement = () => {
   
    const sectionCard =document.querySelector('#section-card')
    const divClone = document.querySelector('#card')
    const cloneEl = divClone.cloneNode(false)
    sectionCard.appendChild(cloneEl)

    const h3 = document.createElement('h3')
    h3.innerHTML = "Sua próxima viagem será para"
    cloneEl.appendChild(h3)

    const state = document.createElement('p')
    const indexUF = selectUF.selectedIndex
    const textUF = selectUF.options[indexUF].innerHTML
    state.innerHTML = `Estato: ${textUF}`
    cloneEl.appendChild(state)

    const city = document.createElement('p')
    const indexCity = selectCity.selectedIndex
    const textCity = selectUF.options[indexCity].innerHTML
    city.innerHTML = `Cidade: ${textCity}`
    cloneEl.appendChild(city)

    const date = document.createElement('p')
    const textDate = selectDate.value
    date.innerHTML = `Data: ${textDate}`
    cloneEl.appendChild(date)

}


//ação do button agendar
const button = document.querySelector('#button')
button.addEventListener('click', cloneElement)
