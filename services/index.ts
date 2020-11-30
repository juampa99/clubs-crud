import {loadTeamData, saveTeamData} from "../api";
import Team from "../entities/Team";
import {mapTeam, unmapTeam} from "../mappers/teamMapper";
import TeamList from "../entities/TeamList";

function loadTeams(backup : boolean) : TeamList{
    const teamDataList = loadTeamData(backup);
    let teamList : TeamList = new TeamList();
    teamDataList.forEach((t : TeamData)=>teamList.pushTeam(mapTeam(t)));
    return teamList;
}

function saveTeams(teamList: TeamList) : void{
    let teamDataList : TeamData[] = [];
    let tlLenght : number = teamList.length();
    for(let i = 0;i < tlLenght; i++){
        let team = teamList.getHead();
        teamDataList.push(unmapTeam(team));
        teamList.popTeamById(team.id);
    }
    saveTeamData(teamDataList);
}

export {loadTeams, saveTeams}
