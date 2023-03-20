const app = require('./app');

require('dotenv').config();
const mongoose = require('mongoose');


const PORT = process.env.PORT || 9900;


app.listen(PORT, () => console.log('Server running at http://localhost:' + PORT));

//Om nåt är fel med connectionen(typ fel lösenord i .env) så kommer vi att få ett fel här
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))