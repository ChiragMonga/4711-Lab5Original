let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req,res) => {

    fs.readFile('users.json', (err,data) => {
        if(err) throw err;
        let content = JSON.parse(data);
        res.render("Lab05", {user: content});
    });
});

app.post('/delete', (req,res) => {
    let content = fs.readFileSync('users.json');
    content = JSON.parse(content);
    for(let i = 0; i < content.length; i++) {
        if(content[i].name === req.body.name) {
            content.splice(i,1);
        }
    }
    fs.writeFileSync('users.json', JSON.stringify(content, null, 2));
    res.redirect('/');
})

app.post('/postAction', (req, res) => {
    
    let userData = [];
    
    user = 
    {
        "name": req.body.name,
        "desc" : req.body.desc,
        "url" : req.body.url
     };

    fs.readFile('users.json', (err,data) => 
    {
        if(err) throw err;
        let content = JSON.parse(data);
        content.push(user);
        userData = JSON.stringify(content, null, 2);

        fs.writeFile('./users.json', userData, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
       })
    });

    res.redirect('/');
});

app.listen(3005, () => console.log('Server ready'));