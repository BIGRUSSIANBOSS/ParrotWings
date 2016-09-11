var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api": {
      target: "http://localhost:3001/",
      changeOrigin: true,
      secure: false
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});

//----------------------------------------------

var express = require('express');
// var session = require('express-session');
var session = require('client-sessions');
// var MongoStore = require('connect-mongo')(session);
var app = express();
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    cookieName: 'session',
    secret: 'asjfgaskfagukywgfkuaywgqyg4124qwuk',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

var AM = require('./modules/account-manager');
// проверка кукисов на наличие пользователя (да по тупому)
app.get('/api/checkauth', function(req, res){
    if(req.session && req.session.user){
        if (req.session.user.user == undefined || req.session.user.pass == undefined){
            res.send({
                login: "failed"
            });
        }else{
            res.send({
                login: "success"
            });
        }
    }else{
        res.send({
            login: "failed"
        });
    }
});

// авторизация
app.post('/api/auth', function(req, res){

    AM.manualLogin(req.body.user, req.body.pass, function(e, o){
        console.log(e, o);
        if (!o){
            res.send({
                status: "user-not-found"
            });
        }	else{
            req.session.user = {
                user: o.user,
                pass: o.pass
            }
            res.status(200).send({
                status: "success"
            });
        }
    });
});
// добавляем пользователя
app.post('/api/addnewuser', function(req, res){
    console.log("Adding new user");
    AM.addNewAccount({
        email 	: req.body['email'],
        user 	: req.body['user'],
        pass	: req.body['pass']
    }, function(e){
        res.send({
            status: "success"
        });
    });
    res.send({
        status: "success"
    });
});
// список пользователей
app.get('/api/users', function(req, res){

    AM.getAccounts(function(accounts){
        console.log(accounts);
        res.status(200).send(accounts);
    });
});
// список пользователей
app.get('/api/logout', function(req, res){
    req.session.reset();
    res.send({
        login: "out"
    });
});
// создаем транзакцию
app.post('/api/createtransaction', function(req, res){

    AM.getUserData(req.session.user.user, function(account){
        var summ = 0;
        for(var i in account.transactions){
            if(account.transactions[i].source == req.session.user.user){
                summ -= Number(account.transactions[i].value);
            }
            if(account.transactions[i].target == req.session.user.user){
                summ += Number(account.transactions[i].value);
            }
        }

        if(Number(req.body['value']) > summ){
            res.status(200).send({
                status: "not enough money"
            });
        }else{
            if(Number(req.body['value']) > 0 ){
                AM.createTransaction({
                    source: req.session.user.user,
                    target: req.body['target'],
                    value: req.body['value'],
                    date: new Date()
                }, function(e){
                    if (e){
                        res.status(400).send(e);
                    }	else{
                        res.status(200).send({
                            status: "success"
                        });
                    }
                });
            }else{
                res.status(200).send({
                    status: "illegal transaction"
                });
            }
        }

    });
});
// создаем транзакцию
app.get('/api/data', function(req, res){

    AM.getUserData(req.session.user.user, function(account){
        res.status(200).send(account);
    });

});




app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
