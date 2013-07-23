
var $ = require("jquery");

// See : http://www.wunderground.com/weather/api/d/docs?d=data/history

var CompareController = {
  compare: function (req, res) {

    console.log("city1: " + req.params.city1);
    console.log("city2: " + JSON.stringify(req.body));

    var model = {city1 : req.body.city1, city2 : req.body.city2};


    $.ajax({ url : "http://api.wunderground.com/api/a5e7f2b0d0857f84/history_20060405/q/CA/San_Francisco.json",//NV/Las_Vegas.json",
        dataType : "jsonp", success : function ( parsedJson )
        {
          var location = parsedJson['location']['city'];
          var temp_f = parsedJson['current_observation']['temp_f'];

          model.location = location;
          model.temp_f = temp_f;

          res.render('root/index', model);

          //alert("Current temperature in " + location + " is: " + temp_f);
        } }
    );



    console.log("model: " + JSON.stringify(model));

    res.render('compare/index', model);
  }
};

module.exports = CompareController;