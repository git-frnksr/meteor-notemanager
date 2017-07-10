import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  // Get notes from the mongo database
  notes(){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    // Prevent default submit behaviour
    event.preventDefault();

    // Get input value 
    const target = event.target;
    const text = target.text.value;

    // Add a new note to the collection
    Meteor.call('notes.insert', text);

    // Clear form
    target.text.value = '';

    // Close the modal
    $('#addNoteModal').modal('close');

    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    Meteor.call('notes.remove', this);
    return false;
  }
});