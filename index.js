const ufSelect = document.querySelector('select[name=ufs]')
const citySelect = document.querySelector('select[name=city]')
const btnAgendar = document.querySelector('button[name=agendar]')
const date = document.querySelector('input[type = date')
const root = document.querySelector('#section-card')

const states = fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
.then(result => result.json())
.then(ufs =>{
    for (state of ufs){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }

})

const citys = (event) =>{
    citySelect.innerHTML = '<option value ="0">Selecione uma Cidade</option>'
    const uf = event.target.value
   
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(result => result.json())
    .then(citys => {
        for (city of citys){
            citySelect.innerHTML += `<option>${city.nome}</option>`
        }
        event.target.value !== '0'? citySelect.disabled = false : citySelect.disabled = true
    })
} 

const btn = (event) => {
    const value = event.target.value
    value  === '0'? btnAgendar.disabled = true : btnAgendar.disabled = false
}

const agendar = () => {
    const indexUf = ufSelect.selectedIndex
    const txtUf = ufSelect.options[indexUf].innerHTML
    const indexCity = citySelect.selectedIndex
    const txtCity = citySelect.options[indexCity].innerHTML
    const txtDate = date.value
    createElement(txtUf, txtCity, txtDate)
}


const createElement = (txtUf, txtCity, txtDate) => {
    const div = document.createElement('div')
    const p0 = document.createElement('p')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    div.classList = 'card'
    p0.innerHTML =`Sua próxima viagem.`
    p1.innerHTML =`Estado: ${txtUf}`
    p2.innerHTML = `Cidade: ${txtCity}`
    p3.innerHTML = `Data: ${txtDate}`
    root.appendChild(div)
    div.appendChild(p0)
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
    console.log(p1.innerHTML)
}


ufSelect.addEventListener('change', citys)
citySelect.addEventListener('change', btn )
btnAgendar.addEventListener('click',agendar)