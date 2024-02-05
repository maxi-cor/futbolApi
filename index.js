document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=a4f5b4223f9e3010cc74e81538e9200e2410e3319a1c21bba5dfb7acc7a8e4bb&from=2024-02-05&to=2024-02-05';
  
    const bringFixture = async () => {
        try {
            const callApi = await fetch(apiKey);
            if (!callApi.ok) {
                throw new Error(`Error de red: ${callApi.status}`);
            }
            const data = await callApi.json();
  
            // Obtén el elemento HTML donde deseas mostrar la respuesta
            const resultadoElemento = document.getElementById('resultado');
  
            // Verifica que el elemento exista antes de operar sobre él
            if (resultadoElemento) {
                // Itera sobre los elementos en data.result
                data.result.forEach(fixture => {
                    const fixtureElemento = document.createElement('div');
  
                    // Muestra información específica de cada fixture
                    fixtureElemento.innerHTML = `
                        <p>Fecha: ${fixture.event_date}</p>
                        <p>Equipo Local: ${fixture.event_home_team}</p>
                        <p>Equipo Visitante: ${fixture.event_away_team}</p>
                        <p>Estadio: ${fixture.event_stadium}</p>
                        <!-- Agrega más información según tus necesidades -->
                    `;
  
                    resultadoElemento.appendChild(fixtureElemento);
                });
            } else {
                console.error('Elemento con ID "resultado" no encontrado.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    bringFixture();
  });
