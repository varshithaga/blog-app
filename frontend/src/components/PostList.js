import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [user, setUser] = useState(null);
  const [showOnlyMyPosts, setShowOnlyMyPosts] = useState(false);

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const res = await API.get(`user/${userId}/`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const fetchPosts = async (tag = '', onlyMine = false) => {
    try {
      let url = `posts/`;
      const queryParams = [];

      if (tag) queryParams.push(`tag=${tag}`);
      if (onlyMine && user?.id) queryParams.push(`author=${user.id}`);

      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      const res = await API.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts('', showOnlyMyPosts);
    }
  }, [user, showOnlyMyPosts]);

  const handleSearch = () => {
    fetchPosts(searchTag.trim(), showOnlyMyPosts);
  };

  const handleCheckMyPosts = () => {
    setShowOnlyMyPosts(prev => !prev);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      padding: '40px',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        color: '#333'
      }}>
        {/* Header Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <input
              type="text"
              value={searchTag}
              placeholder="🔍 Search by tag..."
              onChange={(e) => setSearchTag(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginRight: '10px',
                width: '250px'
              }}
            />
            <button onClick={handleSearch} style={{
              padding: '10px 16px',
              backgroundColor: '#764ba2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Search
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user && (
              <div style={{ textAlign: 'right', marginRight: '10px', fontSize: '14px' }}>
                <div><strong>{user.username}</strong></div>
                <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
              </div>
            )}
            <Link to="/create" style={linkBtnStyle}>➕ Create Post</Link>
            <button onClick={handleCheckMyPosts} style={{ ...linkBtnStyle, backgroundColor: '#f39c12' }}>
              {showOnlyMyPosts ? '🔁 Show All Posts' : '👤 Check My Posts'}
            </button>
            <Link to="/login" style={{ ...linkBtnStyle, backgroundColor: '#e74c3c' }}>🔐 Log Out</Link>
          </div>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} style={cardStyle}>
              <h2 style={{ marginBottom: '5px' }}>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                By <strong>{post.author}</strong> | Tags: <em>{post.tags.map(tag => tag.name).join(', ')}</em>
              </p>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#888' }}>
                👍 {post.likes_count} | 💬 {post.comments_count}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '30px' }}>No posts found.</p>
        )}
      </div>
    </div>
  );
};

const linkBtnStyle = {
  padding: '10px 14px',
  backgroundColor: '#28a745',
  color: '#fff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px'
};

export default PostList;
