document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=a4f5b4223f9e3010cc74e81538e9200e2410e3319a1c21bba5dfb7acc7a8e4bb&from=2024-02-05&to=2024-02-05';

    const bringFixture = async () => {
        try {
            const apiCall = await fetch(apiKey);
            const data = await apiCall.json();
            const fixturesByLeague = {}; // Objeto para almacenar los fixtures agrupados por liga
            const bringDivElement = document.getElementById('resultado');

            
            if (data && data.result) {
                data.result.forEach(element => {
                    if (element.league_name) {
                        // Verificar si la liga ya existe en el objeto, si no, crearla
                        if(element.league_name == 'La Liga' || element.league_name == 'Premier League' && element.country_name == 'England' || element.league_name == 'Serie A' || element.league_name.includes('Liga Profesional Argentina')){
                            
                            if (!fixturesByLeague[element.league_name]) {
                                fixturesByLeague[element.league_name] = [];
                            }
                            // Agregar el fixture al arreglo correspondiente a la liga
                            fixturesByLeague[element.league_name].push(element);
                        }
                    }
                });
                
                // Crear un div para cada liga y agregar los partidos correspondientes
                for (const league in fixturesByLeague) {
                    if (Object.hasOwnProperty.call(fixturesByLeague, league)) {
                        const matches = fixturesByLeague[league];
                        const leagueDiv = document.createElement('div');
                        leagueDiv.innerHTML = `<h2>${league}</h2>`;
                        leagueDiv.style.backgroundColor = 'grey';
                        leagueDiv.style.margin = '5px';
                        
                        matches.forEach(match => {
                            const matchInfo = document.createElement('p');
                            matchInfo.innerHTML = `
                                <p>Fecha: ${match.event_date}</p>
                                <p>Equipo Local: ${match.event_home_team}</p>
                                <p>Equipo Visitante: ${match.event_away_team}</p>
                                <p>Estadio: ${match.event_stadium}</p>
                            `;
                            matchInfo.style.backgroundColor = '#D2CFD3';
                            matchInfo.style.margin = '5px';
                            leagueDiv.appendChild(matchInfo);
                        });

                        bringDivElement.appendChild(leagueDiv);
                    }
                }
            } else {
                throw new Error(`Error de red: ${apiCall.status}`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    bringFixture();
});