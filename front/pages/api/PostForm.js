// pages/post.js
/*import { useState } from 'react';

export default function PostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [response, setResponse] = useState('');

  const handlePostRequest = async () => {
    const response = await fetch('http://localhost:8080/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PinggyAuthHeader': authHeader,  // Add the custom auth header
      },
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      setResponse('Post created successfully!');
    } else {
      setResponse('Unauthorized or something went wrong');
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="text"
        placeholder="PinggyAuthHeader"
        value={authHeader}
        onChange={(e) => setAuthHeader(e.target.value)}
      />
      <button onClick={handlePostRequest}>Submit</button>
      <p>{response}</p>
    </div>
  );
}*/
// components/PostForm.js
import { useState } from 'react';

const PostForm = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !authCode) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PinggyAuthHeader': authCode, // Add Auth Code to headers
        },
        body: JSON.stringify({ title, body }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit post');
      }

      const data = await res.json();
      onPostSubmit(data);
      setTitle('');
      setBody('');
      setAuthCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h2 class="justify-content-center">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label for="Title" class="form-label">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label for="Value" class="form-label">Value</label>
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label for="Authcode" class="form-label">Authcode</label>
        <input
          type="text"
          placeholder="Auth Code"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Post'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;

