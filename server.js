const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '.dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});



// const express = require("express");
// const { resolve } = require("path");

// const app = express();

// app.use("/", express.static(resolve(__dirname, "./dist")));

// app.listen(process.env.PORT || 3000, (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("Funcionando corretamente!");
// });
