import fs from "fs";

function loadTeamData(backup : boolean): TeamData[] {
    let path = './data/';
    if(backup)
        path = path + 'teams_backup.json';
    else
        path = path + 'teams.json';

    const teams = fs.readFileSync(path, 'utf8');
    return JSON.parse(teams);
}

function saveTeamData(teams: TeamData[]): void {
    const teamListString = JSON.stringify(teams, null, '  ');
    fs.writeFileSync('./data/teams.json', teamListString);
}

export { loadTeamData, saveTeamData }
