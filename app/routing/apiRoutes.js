var friendData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData)
    })

    app.post("/api/friends", function (req, res) {
        if (req.body.name && req.body.photo && req.body.scores.indexOf("0") < 0) {
            var score = req.body.scores;
            var match;
            var diff = 40;
            friendData.forEach(function (friend) {
                var temp = 0;
                for (i = 0; i < friend.scores.length; i++) {
                    temp += Math.abs(parseInt(friend.scores[i]) - parseInt(score[i]));
                }
                if (temp < diff){
                    diff = temp;
                    match = friend;
                }
            })
            console.log("You've matched with "+match.name);
            friendData.push(req.body);
            res.send(match);
        } else {
            res.send(false);
        }
    })
}