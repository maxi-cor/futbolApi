document.addEventListener('DOMContentLoaded', () => {

    const today = new Date();
    const year = today.getFullYear();
    // Los meses en JavaScript son indexados desde 0 (enero es 0, febrero es 1, etc.)
    // Por lo tanto, necesitas agregar 1 al mes actual.
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    const apiKey = `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=a4f5b4223f9e3010cc74e81538e9200e2410e3319a1c21bba5dfb7acc7a8e4bb&from=${formattedDate}&to=${formattedDate}`;
    

    const bringFixture = async () => {
        try {
            const apiCall = await fetch(apiKey);
            const data = await apiCall.json();
            const fixturesByLeague = {}; // Objeto para almacenar los fixtures agrupados por liga
            const bringDivElement = document.getElementById('resultado');

            
            if (data && data.result) {
                console.log(data.result)
                data.result.forEach(element => {
                    if (element.league_name) {
                        // Verificar si la liga ya existe en el objeto, si no, crearla
                        if(element.league_name == 'La Liga' || element.league_name == 'Premier League' && element.country_name == 'England' || element.league_name == 'Serie A' || element.league_name.includes('Liga Profesional Argentina')){
                            
                            if (!fixturesByLeague[element.league_name]) {// si no existe
                                fixturesByLeague[element.league_name] = []; // agregalo con un array vacio
                            }
                            // y si existe Agregar el fixture al arreglo correspondiente a la liga
                            fixturesByLeague[element.league_name].push(element);
                        }
                    }
                });
                
                // Crear un div para cada liga y agregar los partidos correspondientes
                for (const league in fixturesByLeague) {
                    if (Object.hasOwnProperty.call(fixturesByLeague, league)) { // Esta línea verifica si la propiedad actual (league) es propia del objeto fixturesByLeague y no es una propiedad heredada de su prototipo.  Esta parte no es necesaria, segun chatGpt incluir esta verificación puede ser una práctica defensiva para garantizar que tu código funcione correctamente en diferentes contextos.
                        const matches = fixturesByLeague[league];
                        const leagueDiv = document.createElement('div');
                        leagueDiv.innerHTML = `<h2>${league}</h2>`;
                        leagueDiv.style.backgroundColor = 'grey';
                        leagueDiv.style.margin = '5px';
                        
                        matches.forEach(match => {
                            const matchInfo = document.createElement('div');
                            matchInfo.innerHTML = `
                            <p>Fecha: ${match.event_date}</p>
                            <p>Equipo Local: ${match.event_home_team}</p>
                            <img src="${match.home_team_logo}" alt="Logo Equipo Local" style="width: 50px; height: 50px;">
                            <p>Equipo Visitante: ${match.event_away_team}</p>
                            <img src="${match.away_team_logo}" alt="Logo Equipo Visitante" style="width: 50px; height: 50px;">
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