import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  HitsList = new Mongo.Collection('hits');

});
