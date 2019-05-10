/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Professor = require('./models/Professor');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


dotenv.config();
mongoose.connect("mongodb+srv://cmsc389K:cmsc389Kpassword@cluster0-afite.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var Professor = require('./models/Professor');

app.post('/professor', function(req, res) {
    var professor = new Professor({
        Name: req.body.Name,
        University: req.body.University,
        Subject: req.body.Subject,
        Rating: parseInt(req.body.Rating),
        Review: req.body.Review
    });

    professor.save(function(err) {
        if (err) throw err;
        res.send('Succesfully inserted professor.');
    });
});

app.get('/',function(req,res){
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
            professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
            console.log(professors[i].Review);
        }
        res.render('home', {
        a : professor_data,
        b : 'All Professors'
    });
    });  
})


app.post('/professor/:id/review', function(req, res) {
    var id = req.params.id
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
            if(professors[i].id == id){
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
            }
        }
        res.render('professor', {
        a : professor_data
    });
});
});

app.get('/delete-form', function(req, res){
  res.render('delete-form', {});
});

app.get('/delete', function(req, res) {
	var n = (req.query.Name);
	var professor_data = []
	Professor.find({}, function(err, professors) {
		if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
        	if(professors[i].Name == n){
            	Professor.findByIdAndRemove(professors[i].id, function(err, professor) {
    			if (err) throw err;
    			res.send('professor deleted!');
				});
				return
            }
        }
        res.send('professor not Found!');
	});
});

app.get('/api/getProfessor', function(req, res) {
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        res.send(professors);
    });
})


app.get('/api/getCollege', function(req, res) {
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
                professor_data.push(professors[i].University)
        }

        res.send(unique(professor_data));
    });
})

app.get('/professor/:id', function(req, res){
    var id = req.params.id
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
            if(professors[i].id == id){
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
            }
        }
        res.render('professor', {
        a : professor_data
    });
    });  
});


app.get('/highRate', function(req, res){
    var professor_data = []
    var highRate = 0
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
            if(professors[i].Rating > highRate){
                highRate = professors[i].Rating
            }
        }
        for(i = 0;i<count;i++){
                 if(professors[i].Rating  == highRate){
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
            }
        }
        res.render('home', {
        a : professor_data,
        b : 'Highest Rated Professors'
    });
    });  
});


app.get('/lowRate', function(req, res){
    var professor_data = []
    var lowRate = 10
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i<count;i++){
            if(professors[i].Rating < lowRate){
                lowRate = professors[i].Rating
            }
        }
        for(i = 0;i<count;i++){
                 if(professors[i].Rating  == lowRate){
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
            }
        }
        res.render('home', {
        a : professor_data,
        b : 'Lowest Rated Professors'
     });
    });  
 });


function unique(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function OrderListBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        }
        else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

app.get('/alpha', function(req, res){
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i < count;i++){  
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
        }
        professor_data.sort(OrderListBy("Name"));
        res.render('home', {
        a : professor_data,
        b : 'Lowest Rated Professors'
     });
    });  
 });


app.get('/rand', function(req, res){
    var professor_data = []
    Professor.find({}, function(err, professors) {
        if (err) throw err;
        var count = Object.keys(professors).length
        for(i = 0;i < count;i++){  
                professor_data.push({"Name":professors[i].Name,"id":professors[i].id, "University":professors[i].University,"Subject":professors[i].Subject,
                    "Rating":professors[i].Rating, "Review":professors[i].Review})
        }
        t = professor_data[Math.floor(Math.random() * count)];
        console.log(t);
        res.render('University', {
        a : t,
        b : 'Random Professor'
     });
    });  
 });

app.get('/professor_form', function(req, res){
  res.render('professor_form', {});
});


app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
