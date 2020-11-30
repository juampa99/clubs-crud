import fs from 'fs';
import express from 'express';
import multer from 'multer';
import exphbs from 'express-handlebars';
import {loadTeams, saveTeams} from "./services";
import Team from "./entities/Team";
import TeamList from "./entities/TeamList";

const upload = multer({dest: './public/uploads/images'});
const PORT : number = 8080;
const hbs = exphbs.create();

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

let teams : TeamList = loadTeams(false);

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req , res  )=>{
    const rawTeamList = teams.getRawList();

    res.render('home', {
        layout: 'main_layout',
        data:{
            rawTeamList
        }
    })
});

app.get('/team/:id', (req, res)=>{
    let team = teams.getTeamById(Number(req.params.id));

    if(!team) {
        res.status(404).send('<h1 style="text-align: center;">404 Not found</h1>')
        return;
    }

    res.render('team', {
        layout: 'main_layout',
        data:{
            team
        }
    })
});

app.get('/team/:id/edit', (req, res)=>{
    let id = req?.params?.id;
    let team;
    if(id === 'new'){
        let newId = teams.getTail()?.id + 1;
        team = new Team({id: newId, status: 'new'});
        teams.pushTeam(team);
    }
    else{
        team = teams.getTeamById(Number(id));
        if(!team){
            res.status(404).send('<h1 style="text-align: center;">404 Not found</h1>')
            return;
        }
    }

    res.render('team_edit', {
        layout: 'main_layout',
        data:{
            team
        }
    })
});

app.get('/delete/:id', (req, res)=>{
    teams.popTeamById(Number(req.params.id));
    saveTeams(teams);
    loadTeams(false);
    res.redirect('/');
})

app.post('/submit-team/:id', upload.single('image'), (req,res)=>{
    let team = teams.getTeamById(Number(req.params.id));

    if(team) {
        Object.assign(team, req.body);
        if(req.file)
            team.crestUrl = '/uploads/images/' + req.file.filename
        team.status = 'done';
    }

    saveTeams(teams);

    res.redirect('/');
})

app.get('/reset-data', (req,res)=>{
    console.log('Data reset in progress..');

    teams = loadTeams(true);

    console.log('Done!');

    res.redirect('/')
})

app.listen(PORT);
console.log(`Listening to http://localhost:${PORT}`);
