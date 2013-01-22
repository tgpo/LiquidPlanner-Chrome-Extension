function init() {
  if (!localStorage.comments) {
		localStorage.comments = "";
	}
	
	var ready = false;
	
	var intervalReady = window.setInterval(checkReady, 5000); 
	
	if(ready){
		getComments();
		var intervalID = window.setInterval(getComments, 5000); 
	  }
	
}

function checkReady() {
	if(LiquidPlanner.isConfigured()) {
		ready = true;
	} else {
		ready = false;
	}
}

init();


function commentChecker(comments) {
	var commentID, allCommentIDs,text;
	allCommentIDs = "0";
    
	for (var i = 0, comment; comment = comments[i]; i++) {
		commentID   = comment.id + ":";
		allCommentIDs = localStorage.comments;
		author = LiquidPlanner.members[comment.member_id] || LiquidPlanner.members[0];
		task   = comment.treeitem;
		
		
		if(allCommentIDs.indexOf(commentID) != -1) {

		} else {
		
			// Create a simple text notification:
			var notification = webkitNotifications.createNotification(
				'images/icon-48.png',  // icon url - can be relative
			  'Liquid Planner Comment Posted',  // notification title
			  text = comment.plain_text.slice(0,72) + author + task.name

			  // notification body text
			);
			
			notification.show();
			localStorage.comments = allCommentIDs + commentID;
		}
  }
  
  //alert(allCommentIDs);
}

function getComments(){
  if(LiquidPlanner.defaults.commentCount > 0){
		LiquidPlanner.chatter({
		  success:  commentChecker,
		  data:{
			'ignore_mine': LiquidPlanner.defaults.ignoreMyComments,
			'for_me':      !LiquidPlanner.defaults.showAllComments,
			'limit':       LiquidPlanner.defaults.commentCount
		}});
	}
}
