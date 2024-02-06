document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=a4f5b4223f9e3010cc74e81538e9200e2410e3319a1c21bba5dfb7acc7a8e4bb&from=2024-02-05&to=2024-02-05';

    const bringFixture = async () => {
        try {
            const apiCall = await fetch(apiKey);
            const data = await apiCall.json();
            const bringDivElement = document.getElementById('resultado');

            if (data && data.result && bringDivElement) {
                data.result.forEach(element => {
                    const createNewDivElement = document.createElement('div');
                    createNewDivElement.style.backgroundColor = 'grey';
                    createNewDivElement.style.margin = '5px';
                    createNewDivElement.innerHTML = `
                        <p>Fecha: ${element.event_date}</p>
                        <p>Equipo Local: ${element.event_home_team}</p>
                        <p>Equipo Visitante: ${element.event_away_team}</p>
                        <p>Estadio: ${element.event_stadium}</p>
                    `
                    bringDivElement.appendChild(createNewDivElement);
                });
            } else {
                throw new Error(`Error de red: ${apiCall.status}`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    bringFixture();
});
