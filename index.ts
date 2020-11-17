import fs from 'fs';
import express from 'express';
import multer from 'multer';
import exphbs from 'express-handlebars';
import {loadTeams, saveTeams} from "./services";
import Team from "./entities/Team";

const upload = multer({dest: './public/uploads/images'});
const PORT : number = 8080;
const hbs = exphbs.create();

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

let teams : Team[] = loadTeams(false);

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req , res  )=>{
    res.render('home', {
        layout: 'main_layout',
        data:{
            teams
        }
    })
});

app.get('/team/:id', (req, res)=>{
    let filteredTeams = teams.filter(t=>t.id == Number(req.params.id));
    let team = undefined;
    if(filteredTeams != null && filteredTeams.length != 0)
        team = filteredTeams[0];
    else {
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
    let filteredTeams = teams.filter(t=>t.id == Number(req.params.id));
    let team = undefined;
    if(filteredTeams != null && filteredTeams.length != 0)
        team = filteredTeams[0];
    else {
        res.status(404).send('<h1 style="text-align: center;">404 Not found</h1>')
        return;
    }

    res.render('team_edit', {
        layout: 'main_layout',
        data:{
            team
        }
    })
});

app.post('/submit-team/:id', upload.single('image'), (req,res)=>{
    let team = teams.filter(t=>t.id == Number(req.params.id))[0];
    Object.assign(team, req.body);
    if(req.file)
        team.crestUrl = '/uploads/images/'+req.file.filename
    res.redirect('/');
})

app.get('/reset-data', (req,res)=>{
    console.log('Data reset in progress..');

    teams = loadTeams(true);

    console.log('Done!');

    res.redirect('/')
})

// Saves data from teams array to data/teams.json
function cleanup(){
    console.log('Saving data..')

    saveTeams(teams);

    console.log('Exiting..')
    process.exit(0);
}

// Executes 'cleanup()' when process is killed
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, cleanup.bind(null, eventType));
})

app.listen(PORT);
console.log(`Listening to http://localhost:${PORT}`);
