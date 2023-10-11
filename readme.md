first command--

mkdir myproject && cd myproject && npx express-generator -e --git && touch .env && mkdir -p controller config && touch controller/authcontroller.js config/config.json && npm init -y && echo APP_PORT=4431 > .env

  --//project create with ejs and gitignor
second command -- after create app then update our config/config.json and env

paste this in app.js--
require("dotenv").config();

set listen in app 

app.listen(process.env.APP_PORT,()=>{
  console.clear();
  console.log(`server is running on  ${process.env.APP_PORT}`);
});

final command---
--- npm install && npm install dotenv && npm install passport && npm install sequelize && npm install helmet && npm install compression && npm install express-rate-limit && npm install mysql2 -g && npm install express-fileupload && npm install cors && npm install passport-jw && npm install passport-jwt && npm install && bcrypt npm install randomstring && npm start ----

start your project--
NOTE :- update your data env, config/config.json,routes/index.js, gitignor app also!

set:- packege.json
  "scripts": {
      "start": "node ./app",
      "dev": "nodemon ./app",
      "prod": "pm2 run start"
    },

 