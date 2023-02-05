import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContex';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
      )
      .then((response) => {
        if( response.data.error ) alert(response.data.error);
        else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
    });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') }
      })
    .then( () => {
      setComments( comments.filter( (val) => {
        return val.id !== id;
      }));
    });
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then( () => {
      navigate("/");
    });
  };

  const date = new Date(postObject.createdAt);
  const createdAt = date.toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  console.log(date);

  return (
    <div className="post-page">
      <div className="left-side">
        <div className="post" id="individual">
          <div className="title">
            {postObject.title}
            <label> {createdAt} </label>
          </div>
          <div className="body"> {postObject.postText} </div>
          <div className="footer">
            {postObject.username}
            { authState.username === postObject.username && (
              <button className="post-delete-btn" onClick={ () => {
                deletePost(postObject.id);
                }}> Delete Post </button>
              )
            }
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="add-comment-container">
          <input type="text" placeholder="Comment..." value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className="list-of-comments">
          {comments.map((comment, key) => {
            return <div key={key} className="comment">
              <p className="left">
                {comment.commentBody}
              </p>
              <span className="right">
                <label> {comment.username} </label>
                {authState.username === comment.username && <button onClick={ () => { deleteComment(comment.id) } }> X </button>}
              </span>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;