

var express = require('express');
var router = express.Router();
var util = require('util');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs');
var path = require("path");
var filename = "savedfile.txt";
var filePath = path.resolve(path.join(__dirname,  filename));

router.get('/', function(req,res,next){
	
					res.render('contactus',{title: 'Contact Us'
											//,sucess: false
											,sucess: req.session.sucess
											,errors: req.session.errors});
		req.session.errors = null;
			}
);

router.post('/', jsonParser,function(req,res,next){
	
	//req.param.fullname;//this used if it were passed as an argument
	//console.log('post contact us called!');
	 req.check('fullname','Fullname should not be empty.').notEmpty();
	 req.check('type','min length is 4 characters.').isLength({min:4});
	 req.check('message','Message should not be empty.').notEmpty();
	// req.checkBody('postparam', 'Body Validation, Invalid postparam and should not be the same with type').notEmpty();
	 var errors = req.validationErrors();
	  if (errors) { 
		 req.session.errors = errors;
		 req.session.sucess = false;
	    res.send('There have been validation errors: ' + util.inspect(errors), 400);
	    return;
	  }else{
		  req.session.sucess = true;		  
	  }	  
        //	if (!req.body) {return res.sendStatus(400);}
       //	console.log(JSON.stringify(req.body));
	    // res.send(req.body.self);
	   //res.redirect('/');
	fs.writeFile(filePath , JSON.stringify(req.body), function (err) {
		  if (err){ throw err;}
		  console.log("files saved in:/n " + filePath);
		});
	
	res.render('thankyoupage', {
		 // data: docsData,
		  title: 'Thank you',
		  header: 'Some Users',
		  body: req.body,  // This is  data as a JSON object.
		});
	});

module.exports = router;