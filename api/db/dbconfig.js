const m = require('mongoose');
const dbpass = process.env.MONGO_ATLAS_DB_PASSWORD || 'admin'
const dburl = `mongodb+srv://admin:${dbpass}@cluster0.vlsixeg.mongodb.net/db?retryWrites=true&w=majority`;
const conn_params={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
const c = m.connect(dburl, conn_params);



//----------------------------------------------------------------
module.exports = c;