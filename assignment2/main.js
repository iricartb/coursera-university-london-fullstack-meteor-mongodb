Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
   
   // this will configure the sign up field so it they only need a username
   Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY',
   });

   Template.messageForm.events({
      // this event listener is triggered when they click on the post! button on the message form template
      'click .js-save-message':function(event){
         var messageText = $('#message-text-input').val();
         
         var messageNickname = "Anon";
         if (Meteor.user()) {
            messageNickname = Meteor.user().username;
         }
         
         var message = { messageText:messageText, nickname:messageNickname, createdOn:new Date() };

         Meteor.call('insertMessage', message, function(err, res){
            if (!res) {
               alert('You need to log in!');
            }
         });
      }
   });

   Template.header.helpers({
      nickname: function() {
         if (Meteor.user()) {
            return Meteor.user().username;
         }
      },
   });

   Template.messageList.helpers({
      messages: function() {
         return Messages.find({}, { sort: {createdOn: -1 }})
      }
   });
}