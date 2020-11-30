import Team from "../entities/Team";

function mapTeam(data : TeamData): Team{
    return new Team({
        id: data.id,
        location: data.area.name,
        name: data.name,
        shortName: data.shortName,
        tla: data.tla,
        crestUrl: data.crestUrl,
        address: data.address,
        phone: data.phone,
        website: data.website,
        email: data.email,
        founded: data.founded,
        clubColors: data.clubColors,
        venue: data.venue,
        lastUpdated: data.lastUpdated
    });
}

function unmapTeam(team: Team) : TeamData{
    return {
        id: team.id,
        name: team.name,
        phone: team.phone,
        shortName: team.shortName,
        tla: team.tla,
        venue: team.venue,
        website: team.website,
        address: team.address,
        area: { id: 0, name: team.location },
        clubColors: team.clubColors,
        crestUrl: team.crestUrl,
        email: team.email,
        founded: team.foundDate,
        lastUpdated: team.lastUpdated
    }
}

export { mapTeam, unmapTeam}
