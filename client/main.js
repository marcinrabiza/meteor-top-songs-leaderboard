import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import 'bootstrap/dist/css/bootstrap.css'

HitsList = new Mongo.Collection('hits');

Template.leaderboard.helpers({ 
  'hit': function(){
    return HitsList.find({}, {sort: {score: -1, song: 1} })
  },

  'selectedClass': function(){
    var hitId = this._id;
    var selectedHit = Session.get('selectedHit'); 
      if (hitId == selectedHit){
        return "selected" 
      }
    },

  'showSelectedHit': function(){
    var selectedHit= Session.get('selectedHit');
    return HitsList.findOne(selectedHit)
  },

});
  
Template.leaderboard.events({ 
  'click .hit': function(){
    var hitId = this._id; 
    Session.set('selectedHit', hitId);
  },

  'click .increment': function(){
    var selectedHit = Session.get('selectedHit');
    HitsList.update(selectedHit, {$inc: {score: 5}});
  },

  'click .decrement': function(){
    var selectedHit = Session.get('selectedHit');
    HitsList.update(selectedHit, {$inc: {score: -5}});
  },

  'submit form': function(event){ event.preventDefault();
    var hitSongVar = event.target.hitSong.value;
    var hitBandVar = event.target.hitBand.value;
    console.log(hitSongVar);
    console.log(hitBandVar);
    HitsList.insert({
      song: hitSongVar,
      band: hitBandVar,
      score: 0 
    });
  },

  'click .remove': function(){
    var selectedHit = Session.get('selectedHit'); 
    HitsList.remove(selectedHit);
  },
    
});