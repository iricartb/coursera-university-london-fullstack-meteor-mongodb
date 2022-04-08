Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
   // this event listener is triggered when they click on the post! button on the nickname form template
   Template.nicknameForm.events({
      'click .js-set-nickname': function(){
         var nickname = $('#nickname-input').val();
         Session.set('nickname', nickname);
      }
   });

   Template.messageForm.events({
      // this event listener is triggered when they click on the post! button on the message form template
      'click .js-save-message': function(event){
         var messageText     = $('#message-text-input').val();
         var messageNickname = Session.get('nickname');
         var message         = { messageText:messageText, nickname:messageNickname, createdOn:new Date() };
         
         Messages.insert(message);
      }
   });

   Template.header.helpers({
      // this helper provides the nickname for the header template
      nickname: function() {
         return Session.get('nickname');
      },
   });

   Template.messageList.helpers({
      // this helper provides the list of messages for the messgaeList template
      messages: function() {
         return Messages.find({});
      }
   });
}