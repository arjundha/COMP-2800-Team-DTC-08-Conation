const express = require("express")
const app = express()
const fs = require('fs');
const readline = require('readline');
const http = require('http');

app.get("/", function(req, res){
    res.render("index.html")
  })

app.listen(3000, function(){
  console.log("Server running. Visit: localhost:3000 in your browser 🚀");
})