const apiKey = '795d7e2d4ba233409e56db5280cb25c3007413b34c2c385f5ad077359bae4bc0';

const players = [
    { id: 367296822, name: "Salah Mohsen" },
    { id: 4014054022, name: "Mahmoud Hassan Trezeguet" },
    { id: 1264524552, name: "Abdallah El Said" },
    { id: 2203029328, name: "Zizo" },
    { id: 103051350, name: "Amr El Solia" },
    { id: 1085336692, name: "Mohamed El-Sheby" },
    { id: 2603042647, name: "Mohamed Sherif" }
];

const tableBody = document.querySelector(".player-stats tbody");

// Function To bring data of each player
function getPlayerStats(playerId) {
    const url = `https://apiv2.allsportsapi.com/football/?met=Players&playerId=${playerId}&APIkey=${apiKey}`;
    console.log(url);
    return fetch(url)  // send request to the API
        .then(res => res.json())
        .then(data => data.result && data.result[0]) // لو الداتا ريزلت موجوده رجّع أول عنصر
        .catch(() => null);
}

tableBody.innerHTML = "";

// loop through the players array
players.forEach(player => {
    getPlayerStats(player.id).then(info => {  // info is the player data
        if (!info) return;                    // لو مفيش بيانات للاعب exit

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>
        <img src="${info.player_image || 'images/player/default-player.png'}"
             alt="${info.player_name}"
             style="width:50px; height:50px; border-radius:50%; margin-right:8px;">
        ${info.player_name}
      </td>
      <td>${info.player_goals || 0} <i class="bi bi-bullseye text-success"></i></td>
      <td>${info.player_yellow_cards || 0} <i class="bi bi-square-fill text-warning"></i></td>
      <td>${info.player_red_cards || 0} <i class="bi bi-square-fill text-danger"></i></td>
    `;
        tableBody.appendChild(tr);
    });
});








// const apiKey = '795d7e2d4ba233409e56db5280cb25c3007413b34c2c385f5ad077359bae4bc0';
// const teamIds = [2765, 585, 2761, 2769]; // الفرق
//             // amasry ahly pyramids cyramica
// const tableBody = document.querySelector(".player-stats tbody");


// function getTeamPlayers(teamId) {
//     const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Players&teamId=${teamId}&APIkey=${apiKey}`;
//     console.log(apiUrl);

//   return fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => data.result || []) 
//     .catch(error => {
//       console.error(`خطأ أثناء تحميل الفريق ${teamId}:`, error);
//       return [];
//     });
// }

// tableBody.innerHTML = "";


// teamIds.forEach(teamId => {
//   getTeamPlayers(teamId).then(players => {
//     players.forEach(player => {
//       const tr = document.createElement("tr");

//       tr.innerHTML = `
//         <td>
//           <img src="${player.result[0].player_image || 'images/default-player.png'}"
//                alt="${player.result[0].player_name}"
//                style="width:50px; height:50px; border-radius:50%; margin-right:8px;">
//           ${player.result[0].player_name} <br>
//           <small>${player.result[0].team_name}</small>
//         </td>
//         <td>${player.result[0].player_goals || 0} <i class="bi bi-bullseye text-success"></i></td>
//         <td>${player.result[0].player_yellow_cards || 0} <i class="bi bi-square-fill text-warning"></i></td>
//         <td>${player.result[0].player_red_cards || 0} <i class="bi bi-square-fill text-danger"></i></td>
//       `;

//       tableBody.appendChild(tr);
//     });
//   });
// });

















///////////////
// const leagueId = 141; // Premier League
// const playerID = 3834854438; // Salah Mohsen
// const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Players&playerId=${playerID}&APIkey=${apiKey}`;

// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         const name = data.result[0].player_name;
//         document.querySelector(".name").innerHTML = name;
//     })
//     .catch(error => console.log(error));
// console.log(apiUrl);


// {
//   "league_key": 141,
//   "league_name": "Premier League",
//   "country_key": 42,
//   "country_name": "Egypt",
//   "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/141_premier-league.png",
//   "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/42_egypt.png"
// }
