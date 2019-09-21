const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = async (url) => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch(e) {
    }
}
module.exports = connect;