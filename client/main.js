import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/Collections.js';


Template.AddBook.events({
  'click .js-save'(){
    var Title = $("#Title").val();
    var Author = $("#Author").val();
    var Description = $("#Description").val();
    var image = $("#image").val();
    
    $("#Title").val('');
    $("#Author").val('');
    $("#Description").val('');
    $("#image").val('');
    $("#AddBooksModal").modal("hide")

    userDB.insert({"Title": Title, "Author": Author, "Description": Description, "image": image})
    console.log("save", Title, Author, Description, image)
    
  },

  'click .js-addbooks'(){
    $("#AddBooksModal").modal("show")
  },
});

Template.mainBody.helpers({
  AllBooks(){
    return userDB.find({});
  },
});

Template.mainBody.events({
  'click .js-delete'(){
    var bookID = this._id
    $("#"+bookID).fadeOut('slow',function(){
      userDB.remove({_id:bookID});
    console.log ("delete",bookID)
    });
  },

  'click .js-view'(){
    $('#viewModal').modal("show");
    console.log ("hello")
  },


  'click .js-like'(event, instance) { 
    var profID = this._id;
    var numLikes = userDB.findOne({_id:  profID}).like;
    if (!numLikes) {
      numLikes = 0;
    }
    numLikes = numLikes + 1;  
    userDB.update({_id:profID}, {$set:{'like': numLikes}});
  },
  'click .js-dislike'(event, instance){
    var profID = this._id;
    var numDisLikes = userDB.findOne({_id:  profID}).dislike;
    if (!numDisLikes) {
      numDisLikes = 0;
    }
    numDisLikes = numDisLikes + 1;  
    userDB.update({_id:profID}, {$set:{'dislike': numDisLikes}});
  },
});


Template.editBook.events({
  'click .js-editbooks'(){

    var bookId = this._id;
    $('#editimage').attr('src',userDB.findOne({_id:bookId}).editimage);
    $("#editTitle").val(userDB.findOne({_id:bookId}).editTitle);
    $("#editAuthor").val(userDB.findOne({_id:bookId}).editAuthor);
    $("#editDescription").val(userDB.findOne({_id:bookId}).editDescription);
    $('#eId').val(userDB.findOne({_id:bookId})._id);
    $('#editBookModal').modal("show");
  },

  'click .js-editsave'(){

    var editTitle = $("#editTitle").val();
    var editAuthor = $("#editAuthor").val();
    var editDescription = $("#editDescription").val();
    var editimage = $("#editimage").val();
    
    $("#editTitle").val('');
    $("#editAuthor").val('');
    $("#editDescription").val('');
    $("#editimage").val('');
    $("#editBookModal").modal("hide")

    userDB.insert({"editTitle": editTitle, "editAuthor": editAuthor, "editDescription": editDescription, "editimage": editimage})
    console.log("save", editTitle, editAuthor, editDescription, editimage)
  },
});



Template.viewbook.events({
  'click .js-like'(event, instance) { 
    var profID = this._id;
    var numLikes = userDB.findOne({_id:  profID}).like;
    if (!numLikes) {
      numLikes = 0;
    }
    numLikes = numLikes + 1;  
    userDB.update({_id:profID}, {$set:{'like': numLikes}});
  },
  'click .js-dislike'(event, instance){
    var profID = this._id;
    var numDisLikes = userDB.findOne({_id:  profID}).dislike;
    if (!numDisLikes) {
      numDisLikes = 0;
    }
    numDisLikes = numDisLikes + 1;  
    userDB.update({_id:profID}, {$set:{'dislike': numDisLikes}});
  },


   'click .js-delete'(){
    var bookID = this._id
    $("#"+bookID).fadeOut('slow',function(){
      userDB.remove({_id:bookID});
    console.log ("delete",bookID)
    });
  },

});

Template.viewbook.helpers({
  AllBooks(){
    return userDB.find({});
  },
});
