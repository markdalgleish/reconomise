var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Event = new Schema({
	id: ObjectId,
	name: String
});
mongoose.model("Event", Event);

var Entity = new Schema({
	business_id: Number,
	events: [Event],
	needs: [{
		type: String,
        comments: String,
        urgency: Number
	}],
	offers: [{
		type: String,
        comments: String,
        availability: Number
	}]
});
mongoose.model("Entity", Entity);

module.exports = mongoose;