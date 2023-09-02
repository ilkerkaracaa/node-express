const express = require("express"); // require express moduleconst
app = express(); // calls express function to start new Express app
const path = require("path"); // require path module
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
// app.get("/", (req, res) => {
//   res.json({ name: "İlker Karaca" });
// });

app.get("/hakkinda", (req, res) => {
  res.json({ name: "İlker" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

console.log(__dirname);
