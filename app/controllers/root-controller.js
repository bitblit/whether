var $ = require("jquery");

var RootController = {
  index: function (req, res) {
    console.log("user: " + JSON.stringify(req.user));
    
    var model = {title : 'Whether'};
    if (req.user) {
      model.user = req.user;
      model.email = model.user.email;
    }

    $.ajax({ url : "http://api.wunderground.com/api/a5e7f2b0d0857f84/geolookup/conditions/q/NV/Las_Vegas.json",
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



  }
};

module.exports = RootController; 