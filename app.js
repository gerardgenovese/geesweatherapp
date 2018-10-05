let express = require('express');
let app = express();



app.use(express.static('public'));
app.use('*/css',express.static('css'));
app.use('*/images',express.static('images'));


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('server is running');
});

