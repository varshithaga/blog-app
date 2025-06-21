import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagNames, setTagNames] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('is_published', true);

    const tagsArray = tagNames
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    tagsArray.forEach(name => formData.append('tag_names', name));

    if (image) formData.append('image', image);

    try {
      await API.post('posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/posts');
    } catch (err) {
      console.error("Post creation error:", err.response?.data || err.message);
      alert("Failed to create post: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Left Info Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(to bottom right, #f12711, #f5af19)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📝 Write Something Awesome</h1>
        <p style={{ fontSize: '18px', textAlign: 'center', maxWidth: '300px' }}>
          Share your thoughts, ideas, and stories with the world.
        </p>
        <br />
        <button
          onClick={() => navigate('/posts')}
          style={{
            padding: '10px 20px',
            background: '#fff',
            color: '#f12711',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          👁️ View All Posts
        </button>
      </div>

      {/* Right Form Panel */}
      <div style={{
        flex: 1,
        backgroundColor: '#fdfdfd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{
            width: '90%',
            maxWidth: '450px',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Create a New Post</h2>

          {/* Title */}
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter blog title"
            style={inputStyle}
          />

          {/* Content */}
          <label>Content:</label>
          <textarea
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            rows={6}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          {/* Image Upload */}
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={{ marginBottom: '15px' }}
          />
          <br></br>

          {/* Tags */}
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tagNames}
            placeholder="e.g., Tech, Programming, AI"
            onChange={e => setTagNames(e.target.value)}
            style={inputStyle}
          />

          {/* Submit */}
          <button type="submit" style={submitButtonStyle}>
            🚀 Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default PostForm;
