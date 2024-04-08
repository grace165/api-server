const mongoose = require('mongoose') 
const NOTIFICATIONTYPE = require('./notificationtype')

const Schema = mongoose.Schema

const notificationSchema = new Schema({ 
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    is_read: {
        type: Boolean, 
        default: false, 
        required: true
    },
    notificationType: {
        type: String, 
        enum: NOTIFICATIONTYPE, 
        required: true
    },
    study: {
        type: Schema.Types.ObjectId,
        ref: 'StudyGroup',
        required: false
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification