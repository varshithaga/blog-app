import React, { useState, useEffect } from 'react';
import API from '../api/api';

const Comment = ({ comment, onReply }) => (
  <div
    style={{
      marginLeft: comment.parent ? 20 : 0,
      borderLeft: comment.parent ? '2px solid #ccc' : 'none',
      paddingLeft: 15,
      marginTop: 10,
    }}
  >
    <div
      style={{
        background: '#f9f9f9',
        border: '1px solid #ddd',
        padding: '10px 15px',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      }}
    >
      <p style={{ marginBottom: 5 }}><strong>{comment.user}</strong></p>
      <p style={{ margin: 0 }}>{comment.content}</p>
      <button
        onClick={() => onReply(comment.id)}
        style={{ marginTop: 5, fontSize: '12px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Reply
      </button>
    </div>

    {comment.replies && comment.replies.map(reply => (
      <Comment key={reply.id} comment={reply} onReply={onReply} />
    ))}
  </div>
);

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const fetchComments = () => {
    API.get(`comments/?post=${postId}`).then(res => setComments(res.data));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem('user_id'));

    await API.post('comments/', {
      post: postId,
      user: userId,
      content: newComment,
      parent: replyTo
    });

    setNewComment("");
    setReplyTo(null);
    fetchComments();
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>💬 Comments</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {replyTo && (
          <p style={{ fontSize: '14px', color: '#555' }}>Replying to  <strong>{replyTo?.user}</strong></p>
        )}
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          required
          placeholder="Write your comment..."
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            resize: 'vertical',
            minHeight: '60px'
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {replyTo ? 'Reply' : 'Add Comment'}
        </button>
        {replyTo && (
          <button
            type="button"
            onClick={() => setReplyTo(null)}
            style={{
              marginLeft: '10px',
              backgroundColor: '#ccc',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        {comments.filter(c => !c.parent).map(c => (
          <Comment key={c.id} comment={c} onReply={setReplyTo} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
