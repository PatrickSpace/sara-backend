const mongoose = require("mongoose");
const { USERDB, PASSWORD, DBNAME, MONGODBHOST } = process.env;
const configdb = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

const uri = `mongodb+srv://${USERDB}:${PASSWORD}@${MONGODBHOST}/${DBNAME}?retryWrites=true&w=majority`;

try {
  mongoose.connect(uri, configdb);
  console.log("bd conectada");
} catch (err) {
  console.log(err);
}
