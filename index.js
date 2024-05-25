import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

/* set up the client and server comm*/
let app = express();
let port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/* load the inital start up page*/
app.get("/", (req,res) => {
    res.render("index.ejs", {out:"To create a new Robot simply enter a new text in the box below"});
});

/* when user submits the text load the page contaning the robot picture and uses the api info page*/
app.post("/submit", async(req,res) => {
    try {
        let text = req.body.text;
        let img =  "https://robohash.org/"+text;
        const info = await axios.get("https://randomuser.me/api/");
        res.render("robot.ejs", {out:"Your Robot aka \'"+text+"'", robot:img, fname:info.data.results[0].name.first, lname:info.data.results[0].name.last, gender:info.data.results[0].gender, city:info.data.results[0].location.city,
            state:info.data.results[0].location.state, country:info.data.results[0].location.country, dob:info.data.results[0].dob.date.split('T')[0], age:info.data.results[0].dob.age, cnum:info.data.results[0].cell
        });
    }
    catch(error) {
        console.log(error.response.data);
        res.status(500);
    }
});

/* console logs the port*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});