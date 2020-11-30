import Team from "./Team";

export default class TeamList{
    private teamList : Team[];

    constructor(tl ?: Team[]) {
        this.teamList = tl ? tl : [];
    }

    private sortList() : void{
        this.teamList.sort((t1, t2)=> t1.id - t2.id)
    }

    public getTeamById(id: number) : Team | null {
        return (this.teamList).filter(t=>t.id==id)?.[0];
    }

    public pushTeam(team : Team) : void {
        this.teamList.push(team);
        this.sortList();
    }

    public popTeamById(id : number) : void {
        this.teamList = this.teamList.filter((t : Team)=> t.id != id);
    }

    public getTail() : Team {
        return this.teamList[this.teamList.length-1];
    }

    public getHead() : Team {
        return this.teamList[0];
    }

    public length() : number {
        return this.teamList.length;
    }

    public getRawList() : Team[]{
        return this.teamList.filter(t=>t.status != 'new');
    }

    public copy() : TeamList{
        return new TeamList(this.teamList)
    }
}
