const mongoose = require('mongoose') 
const NOTIFICATIONTYPE = require('./notificationtype')
const ObjectId = require('mongodb').ObjectId;


const Schema = mongoose.Schema

const notificationSchema = new Schema({ 
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: ObjectId,
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
    notification_type: {
        type: String, 
        enum: NOTIFICATIONTYPE, 
        required: true
    },
    studyGroupId: {
        type: ObjectId,
        ref: 'StudyGroup',
        required: false
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification