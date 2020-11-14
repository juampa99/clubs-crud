import fs from "fs";
import Team from "../entities/Team";
import {unmapTeam} from "../mappers/teamMapper";

function loadTeamData(): TeamData[]{
    const teams = fs.readFileSync('./data/teams.json', 'utf8');
    return JSON.parse(teams);
}

function saveTeamData(teams: TeamData[]): void {
    const teamListString = JSON.stringify(teams);
    fs.writeFileSync('student-2.json', teamListString);

}

export { loadTeamData, saveTeamData }
