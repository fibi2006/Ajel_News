const leagueId = 152;
const apiKey = "48d1b6c20593a911d154dcea4b7a11bcacc228d4f9fb85f2e4429490575efdd5";
const url = `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${leagueId}&APIkey=${apiKey}`;
const tableBody = document.querySelector("tbody");
fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.success === 1) {
            const teams = data.result.total;
            tableBody.innerHTML = "";

            teams.forEach((team, i) => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td class="nameClub"><img src="${team.team_logo}" class="team"> ${team.standing_team}</td>
                        <td>${team.standing_P}</td>
                        <td>${team.standing_W}</td>
                        <td>${team.standing_D}</td>
                        <td>${team.standing_L}</td>
                        <td>${team.standing_F}</td>
                        <td>${team.standing_A}</td>
                        <td>${team.standing_GD}</td>
                        <td class="points">${team.standing_PTS}</td>
                    </tr>
                `;
            });
        } 
    })
    .catch(error => {
        console.log(error);
        tableBody.innerHTML = "<tr><td colspan='10'>حصل خطأ أثناء تحميل البيانات</td></tr>";
    });
