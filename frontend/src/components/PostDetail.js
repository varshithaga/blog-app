import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import CommentSection from './CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchPost = async () => {
    const res = await API.get(`posts/${id}/`);
    setPost(res.data);
  };

  const fetchLikeStatus = async () => {
    try {
      const res = await API.get(`likes/${id}/status/`);
      setLiked(res.data.liked);
      setLikeCount(res.data.count);
    } catch (err) {
      console.error('Failed to fetch like status:', err);
    }
  };

  const toggleLike = async () => {
    try {
      const res = await API.post(`likes/${id}/toggle/`);
      setLiked(res.data.liked);
      fetchLikeStatus();
    } catch (err) {
      alert('You need to log in to like.');
    }
  };

  useEffect(() => {
    fetchPost();
    fetchLikeStatus();
  }, [id]);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '30px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      background: 'white'
    }}>
      {post && (
        <>
          <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '10px' }}>{post.title}</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            <strong>By:</strong> {post.author}
          </p>
          <p style={{ lineHeight: '1.6', color: '#444' }}>{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              style={{
                maxWidth: '100%',
                borderRadius: '10px',
                marginTop: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
          )}

          <p style={{ color: '#888', fontStyle: 'italic' }}>
            <strong>Tags:</strong> {post.tags.map(t => t.name).join(', ')}
          </p>

          {/* Like Button */}
          <button
            onClick={toggleLike}
            style={{
              backgroundColor: liked ? '#0088cc' : '#eee',
              color: liked ? '#fff' : '#333',
              padding: '8px 14px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            {liked ? '💙 Liked' : '👍 Like'} ({likeCount})
          </button>

          <hr style={{ margin: '30px 0' }} />
          <CommentSection postId={id} />
        </>
      )}
    </div>
  );
};

export default PostDetail;
