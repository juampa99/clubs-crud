import fs from 'fs';
import express from 'express';
import multer from 'multer';
import exphbs from 'express-handlebars';
import {loadTeams} from "./services";
import Team from "./entities/Team";

const upload = multer({dest: './data/uploads/images'});
const PORT : number = 8080;
const hbs = exphbs.create();

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const teams : Team[] = loadTeams();

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
    let teamss = teams.filter(t=>t.id == Number(req.params.id));
    let team = undefined;
    if(teamss != null && teamss.length != 0)
        team = teamss[0];
    else
        res.send('<h1>404</h1>')

    res.render('team', {
        layout: 'main_layout',
        data:{
            team
        }

    })


});

function cleanup(){
    console.log('Exiting.. ')
    process.exit(0);
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, cleanup.bind(null, eventType));
})

app.listen(PORT);
console.log(`Listening to http://localhost:${PORT}`);
