import React from 'react';


export default class Comments extends React.Component{
   renderComment(comment,i){
     return(
     <div className="comment" key={i}>
      <p>
        <strong>{comment.user}</strong>
        {comment.text}
      </p>
     </div>
   )
   }
  render(){
    return(
      <div className="comments">
      {this.props.postComments.map(this.renderComment)}
      <form ref="commentForm" className="comment-form" >
         <input type="text" ref="author" placeholder="author"/>
         <input type="text" ref="comment" placeholder="comment"/>
         <input type="submit" hidden />
      </form>
      </div>
    );
  }
}
