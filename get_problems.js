const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const problems = await mongoose.connection.db.collection('problems').find({}).toArray();
        console.log(JSON.stringify(problems, null, 2));
    } finally {
        await mongoose.disconnect();
    }
}
run();
