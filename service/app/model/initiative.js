import mongoose from "mongoose";

const initiativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    donate: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});

const Initiative = mongoose.model('Initiative', initiativeSchema);

export default Initiative


''