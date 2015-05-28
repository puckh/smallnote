var express = require('express');
var mongojs = require('mongojs');
var app = express();
var bodyParser = require('body-parser')
    // app.get('/', function(req, res) {
    // 	res.send('yo');
    // });
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

var db = mongojs("firstDatabase", ["Clients"]);




// app.get("/manageClients", function(req, res) {
// 	db.Clients.find(function(err,doc) {
// 	res.json(doc);
// 	console.log(doc);
// 	});
// });

//	app.post("/manageClients", function(req, res) {
//		
//		db.Clients.findOne( { name:req.body.name }, function(err, doc) {
//			if (doc) {
//				res.json("duplicate");
//			} else {
//				db.Clients.insert(req.body, function(err, doc) {
//					res.json(doc);
//				});		
//			}
//		});
//		
//	});

//	app.delete("/manageClients/:id", function(req, res) {
//
//		var id = req.params["id"]; 
//		db.Clients.remove( {_id : mongojs.ObjectId(id) }, function(err,doc) {
//			res.send(200);
//		});
//	});

//	//if 'xxx' find and return everything
//	//else find only the matching id
//	app.get("/manageClients/:id", function(req, res) {
//		var param = req.params["id"]; 
//		if ( param === "xxx") {
//			db.Clients.find(function(err,doc) {
//				res.json(doc);
//			});
//
//		} else {
//			var id = req.params["id"];  
//			db.Clients.findOne( {_id : mongojs.ObjectId(id)}, function(err, doc) {
//				res.json(doc);
//			});
//		}
//
//	});


//	app.put("/manageClients/:id", function(req, res) {
//		var theId = req.body._id;
//
//		db.Clients.findAndModify({
//			query: { _id:mongojs.ObjectId(theId) },
//			update: { $set: { name:req.body.name,  password:req.body.password } },
//			new: true
//		}, function(err, doc, lastErrorObject) {
//			res.json(doc);
//		});
//	});

app.post("/note", function (req, res) {
    //load the note
    db.Clients.findOne({
        name: req.body.name
    }, function (err, doc) {
        if (doc) {
            var returnMe = {
                "name": doc.name,
                "note": doc.note
            };

            if (typeof (doc.pass) === 'undefined') {
                returnMe.gotpass = 'no';
            } else {
                returnMe.gotpass = 'yes';
            }

            res.json(returnMe);
        } else {
            res.json(null);
        }
    });

});


app.put("/note", function (req, res) {

    db.Clients.findOne({
        name: req.body.name
    }, function (err, doc) {

        if (doc) {
            //client already exists - check password
            var result = JSON.stringify(doc);

            if (typeof (doc.pass) === 'undefined') {
                //no password in original note
                db.Clients.findAndModify({
                    query: {
                        name: req.body.name
                    },
                    update: {
                        $set: {
                            note: req.body.note
                        }
                    },
                    new: true
                }, function (err, doc, lastErrorObject) {
                    var returnMe = {
                        "name": doc.name,
                        "note": doc.note,
                        "gotpass": 'nooriginal'
                    };
                    res.json(returnMe);
                });

            } else if (doc.pass === req.body.pass) {

                db.Clients.findAndModify({
                    query: {
                        name: req.body.name
                    },
                    update: {
                        $set: {
                            note: req.body.note
                        }
                    },
                    new: true
                }, function (err, doc, lastErrorObject) {
                    var returnMe = {
                        "name": doc.name,
                        "note": doc.note
                    };

                    if (typeof (doc.pass) === 'undefined') {
                        returnMe.gotpass = 'no';
                    } else {
                        returnMe.gotpass = 'yes';
                    }

                    res.json(returnMe);
                });

            } else {
                res.json("invalid");
            }





        } else {
            //make new client
            db.Clients.insert(req.body, function (err, doc) {

                var returnMe = {
                    "name": doc.name,
                    "note": doc.note
                };

                if (typeof (doc.pass) === 'undefined') {
                    returnMe.gotpass = 'no';
                } else {
                    returnMe.gotpass = 'yes';
                }

                res.json(returnMe);
            });
        }
    });


});


//	app.post("/login", function(req, res) {
//		var theObj;
//		var theName = req.body.name;
//		db.Clients.findOne( {name : theName}, function(err, doc) {
//			theObj = doc;
//			if (theObj) {
//				if (theObj.password === req.body.password) { 
//					res.json("pass");
//				} else {
//					res.json("fail");
//				}	
//			} else {
//				res.json("fail");
//			}
//		});
//	});

app.listen(3001);