import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(text){
        // Check datatype
        check(text, String);
        // Check for logged in user
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        // Insert new note to collection
        Notes.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    'notes.remove'(note){
        // Check note id datatype
        check(note._id, String);

        if(note.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Notes.remove(note._id);
    }
})