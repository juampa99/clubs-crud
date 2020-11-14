export default class Team{
    public id: number;
    public area: { id: number, name: string };
    public name: string;
    public shortName: string;
    public tla: string;
    public crestUrl: string;
    public address: string;
    public phone: string;
    public website: string;
    public email: string;
    public foundDate: number;
    public clubColors: string;
    public venue: string;
    public lastUpdated: string;


    constructor(teamData:{
                    id: number,
                    area: {id: number, name: string},
                    name: string,
                    shortName: string,
                    tla: string,
                    crestUrl: string,
                    address: string,
                    phone: string,
                    website: string,
                    email: string,
                    founded: number,
                    clubColors: string,
                    venue: string,
                    lastUpdated: string
                }
    ) {
        this.id = teamData.id;
        this.area = teamData.area;
        this.name = teamData.name;
        this.shortName = teamData.shortName;
        this.tla = teamData.tla;
        this.crestUrl = teamData.crestUrl;
        this.address = teamData.address;
        this.phone = teamData.phone;
        this.website = teamData.website;
        this.email = teamData.email;
        this.foundDate = teamData.founded;
        this.clubColors = teamData.clubColors;
        this.venue = teamData.venue;
        this.lastUpdated = teamData.lastUpdated;
    }
}
