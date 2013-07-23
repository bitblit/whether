var CompareController = {
  compare: function (req, res) {

    console.log("city1: " + req.params.city1);
    console.log("city2: " + JSON.stringify(req.body));

    var model = {city1 : req.body.city1, city2 : req.body.city2};

    console.log("model: " + JSON.stringify(model));

    res.render('compare/index', model);
  }
};

module.exports = CompareController;