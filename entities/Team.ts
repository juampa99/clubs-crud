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
        this.area = teamData.area ? teamData.area : {name: 'Team location', id: 0};
        this.name = teamData.name ? teamData.name : 'Team Name';
        this.shortName = teamData.shortName ? teamData.shortName : 'Team shortname';
        this.tla = teamData.tla ? teamData.tla : 'tla';
        this.crestUrl = teamData.crestUrl ? teamData.crestUrl : 'https://via.placeholder.com/300';
        this.address = teamData.address ? teamData.address : '';
        this.phone = teamData.phone ? teamData.phone : 'Team phone';
        this.website = teamData.website ? teamData.website : 'https://placeholder.com/';
        this.email = teamData.email ? teamData.email : 'example@gmail.com';
        this.foundDate = teamData.founded ? teamData.founded : 0;
        this.clubColors = teamData.clubColors ? teamData.clubColors : 'Team colors';
        this.venue = teamData.venue ? teamData.venue : 'Team venue';
        this.lastUpdated = teamData.lastUpdated ? teamData.lastUpdated : 'Data last updated..';
    }
}
