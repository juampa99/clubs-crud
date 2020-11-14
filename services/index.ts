import {loadTeamData, saveTeamData} from "../api";
import Team from "../entities/Team";
import {mapTeam, unmapTeam} from "../mappers/teamMapper";

function loadTeams() : Team[]{
    const teamDataList = loadTeamData();
    const teamList = teamDataList.map(team=>mapTeam(team));

    return teamList;
}

function saveTeams(teamList: Team[]) : void{
    const teamDataList : TeamData[] = teamList.map(team=>unmapTeam(team));
    saveTeamData(teamDataList);
}

export {loadTeams, saveTeams}
