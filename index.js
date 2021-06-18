const ufSelect = document.querySelector('select[name=ufs]')
const citySelect = document.querySelector('select[name=city]')
const btnAgendar = document.querySelector('button[name=agendar]')
const root = document.querySelector('#root')

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
    //const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
   
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
    console.log(event.target.value)
}

ufSelect.addEventListener('change', citys)
citySelect.addEventListener('change', btn )