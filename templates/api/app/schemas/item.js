
let mongoose 	= require('mongoose')
let Schema 		= mongoose.Schema
let ObjectId 	= Schema.Types.ObjectId

module.exports = mongoose.model('Item', new Schema({

	name: {
		type: String,
		required: true
	},
	parentItem: {
		type: ObjectId,
		ref: 'Item',
		index: true
	},
	created: {
		type: Date,
		default: Date.now
	}

}))
