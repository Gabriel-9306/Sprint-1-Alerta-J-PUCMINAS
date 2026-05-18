
const ContainerDasCartas = document.getElementById("ContainerdasCartas");

window.onload = function() {
    CriarCardsDasCidades()
}

function CarregarCard(){

}

function CriarCardAoCarregarAPagina() {

}

async function CriarCardsDasCidades() {
    const Dados = await fetch("http://localhost:3000/cidades")
    const Cidades = await Dados.json()
    Cidades.forEach(Cidade => {
        CriarCard(Cidade.Nome)
    });
}

async function CriarCard(Cidade) {
    const TemplateDoCard = document.getElementById("Templatecardcidade").content
    const Card = TemplateDoCard.cloneNode(true)
    const DadosClimaticos = await PegarDadosClimaticos(Cidade)
    Card.querySelector(".TituloCidade").textContent = Cidade
    Card.querySelector(".Temperatura").textContent = DadosClimaticos.main.feels_like + " °C"
    Card.querySelector(".Umidade").textContent = DadosClimaticos.main.humidity + " %"
    Card.querySelector(".VelocidadeVento").textContent = (DadosClimaticos.wind.speed*3.6).toFixed(1) + " km/h"
    ContainerDasCartas.appendChild(Card)
}

async function PegarDadosClimaticos(Cidade) {
    let CoordenadasLatLong = await PegarCoordernadasgeocoding(Cidade)
    const Resultados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordenadasLatLong[0]}&lon=${CoordenadasLatLong[1]}&appid=c48b261a83b3c9b641a788c19a747d5d&units=metric`)
    const data = await Resultados.json();
    console.log(data)
    return data;
}

async function PegarCoordernadasgeocoding(Cidade) {
    const Resultados = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${Cidade}&limit=5&appid=c48b261a83b3c9b641a788c19a747d5d`)
    const data = await Resultados.json();
    console.log(data)
    return [data[0].lat,data[0].lon];
}