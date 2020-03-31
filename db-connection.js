const mongoose = require('mongoose');

const connectDB = mongoose
  .connect("mongodb://localhost:27017/todo-list", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('\n\nConnected with MongoDB'))
  .catch(err => console.error('Error on db connection: ', err));

const itemDefaultSchema = new mongoose.Schema({ text:'string', checked: 'boolean' })
const defaultSchema = new mongoose.Schema({ title: 'string', itens: [itemDefaultSchema] });

const List = mongoose.model('List', defaultSchema);

const defaultList = new List({ title: 'TODO Sample', itens: [{ text: 'TODO one', checked: false }] });

defaultList.save(err => err && console.log(err));

module.exports = connectDB;
  