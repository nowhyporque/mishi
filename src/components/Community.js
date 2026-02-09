import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp 
} from "firebase/firestore";
import React, { useState, useEffect } from 'react';

const auth = getAuth(app);
const storage = getStorage(app);

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: '', imageFile: null });
  const [showCommentInput, setShowCommentInput] = useState({});
  const [commentText, setCommentText] = useState({});
  const [uploading, setUploading] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const postsRef = collection(db, 'communityPosts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      setNewPost({ ...newPost, imageFile: file });
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please sign in to post');
      return;
    }

    if (!newPost.text.trim() && !newPost.imageFile) {
      alert('Please add some text or an image');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = '';

      // Upload image to Firebase Storage if one was selected
      if (newPost.imageFile) {
        const imageRef = ref(storage, `communityPosts/${currentUser.uid}/${Date.now()}_${newPost.imageFile.name}`);
        await uploadBytes(imageRef, newPost.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Create post in Firestore
      await addDoc(collection(db, 'communityPosts'), {
        text: newPost.text,
        image: imageUrl,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email || 'Anonymous',
        authorPhoto: currentUser.photoURL || '',
        likes: [],
        comments: [],
        createdAt: serverTimestamp()
      });

      setNewPost({ text: '', imageFile: null });
      
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLike = async (postId, currentLikes) => {
    if (!currentUser) {
      alert('Please sign in to like posts');
      return;
    }

    const postRef = doc(db, 'communityPosts', postId);
    const hasLiked = currentLikes.includes(currentUser.uid);

    try {
      await updateDoc(postRef, {
        likes: hasLiked 
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid)
      });
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!currentUser) {
      alert('Please sign in to comment');
      return;
    }

    const text = commentText[postId]?.trim();
    if (!text) return;

    const postRef = doc(db, 'communityPosts', postId);

    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          id: Date.now().toString(),
          text: text,
          authorId: currentUser.uid,
          authorName: currentUser.displayName || currentUser.email || 'Anonymous',
          authorPhoto: currentUser.photoURL || '',
          createdAt: new Date().toISOString()
        })
      });

      setCommentText({ ...commentText, [postId]: '' });
      setShowCommentInput({ ...showCommentInput, [postId]: false });
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #e1e8ed',
        backgroundColor: 'white',
        padding: '20px 40px',
        marginBottom: '0'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Community</h1>
        <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '16px' }}>
          Share stories, tips, and updates with the Mishi community
        </p>
      </div>

      {/* Create Post Section - Full Width */}
      {currentUser ? (
        <div style={{
          backgroundColor: 'white',
          padding: '30px 40px',
          marginBottom: '40px',
          borderBottom: '1px solid #e1e8ed'
        }}>
          <form onSubmit={handleCreatePost}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#6B46C1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="You" 
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  (currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()
                )}
              </div>
              
              <textarea
                placeholder="What's happening in your community?"
                value={newPost.text}
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                style={{
                  flex: 1,
                  border: '1px solid #e1e8ed',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '18px',
                  resize: 'none',
                  minHeight: '120px',
                  fontFamily: 'Arial, sans-serif',
                  outline: 'none'
                }}
                rows="4"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingLeft: '71px' }}>
              {/* Image Upload Button */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: '1px solid #e1e8ed',
                borderRadius: '24px',
                cursor: 'pointer',
                backgroundColor: newPost.imageFile ? '#e8f5e9' : 'white',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = newPost.imageFile ? '#e8f5e9' : 'white'}
              >
                <span style={{ fontSize: '20px' }}>📷</span>
                <span style={{ fontSize: '15px', fontWeight: '500' }}>
                  {newPost.imageFile ? newPost.imageFile.name : 'Add Photo'}
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>

              {/* Remove image button if file selected */}
              {newPost.imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setNewPost({ ...newPost, imageFile: null });
                    const fileInput = document.getElementById('image-upload');
                    if (fileInput) fileInput.value = '';
                  }}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '24px',
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ✕ Remove
                </button>
              )}
              
              <div style={{ flex: 1 }}></div>
              
              <button 
                type="submit"
                disabled={uploading}
                style={{
                  backgroundColor: uploading ? '#ccc' : '#6B46C1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!uploading) e.currentTarget.style.backgroundColor = '#5a3aa3';
                }}
                onMouseLeave={(e) => {
                  if (!uploading) e.currentTarget.style.backgroundColor = '#6B46C1';
                }}
              >
                {uploading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          textAlign: 'center',
          color: '#666',
          marginBottom: '40px',
          borderBottom: '1px solid #e1e8ed'
        }}>
          <p style={{ margin: 0, fontSize: '16px' }}>Please sign in to create posts and interact with the community.</p>
        </div>
      )}

      {/* Posts Feed */}
      <div style={{ 
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        {posts.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '60px 40px',
            textAlign: 'center',
            color: '#666',
            borderRadius: '12px'
          }}>
            <p style={{ margin: 0, fontSize: '16px' }}>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                marginBottom: '20px',
                padding: '24px',
                transition: 'box-shadow 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
            >
              {/* Post Header */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#6B46C1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {post.authorPhoto ? (
                    <img 
                      src={post.authorPhoto} 
                      alt={post.authorName}
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    (post.authorName || 'A')[0].toUpperCase()
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{post.authorName}</span>
                    <span style={{ color: '#666', fontSize: '15px' }}>·</span>
                    <span style={{ color: '#666', fontSize: '15px' }}>
                      {post.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}
                    </span>
                  </div>
                  
                  {/* Post Content */}
                  <div style={{ marginTop: '12px' }}>
                    {post.text && (
                      <p style={{ 
                        margin: '0 0 16px 0', 
                        fontSize: '16px', 
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }}>
                        {post.text}
                      </p>
                    )}
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        style={{
                          width: '100%',
                          maxHeight: '500px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '1px solid #e1e8ed',
                          marginTop: '12px'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div style={{
                display: 'flex',
                gap: '80px',
                marginTop: '16px',
                paddingLeft: '63px',
                borderTop: '1px solid #f0f0f0',
                paddingTop: '16px'
              }}>
                <button
                  onClick={() => handleLike(post.id, post.likes || [])}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: currentUser && post.likes?.includes(currentUser.uid) ? '#e0245e' : '#666',
                    fontSize: '15px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '18px' }}>
                    {currentUser && post.likes?.includes(currentUser.uid) ? '❤️' : '🤍'}
                  </span>
                  <span>{post.likes?.length || 0}</span>
                </button>

                <button
                  onClick={() => setShowCommentInput({
                    ...showCommentInput,
                    [post.id]: !showCommentInput[post.id]
                  })}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#666',
                    fontSize: '15px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '18px' }}>💬</span>
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div style={{ 
                  marginTop: '16px',
                  paddingLeft: '63px',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '16px'
                }}>
                  {post.comments.map((comment) => (
                    <div 
                      key={comment.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '16px'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#6B46C1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {comment.authorPhoto ? (
                          <img 
                            src={comment.authorPhoto} 
                            alt={comment.authorName}
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          (comment.authorName || 'A')[0].toUpperCase()
                        )}
                      </div>
                      <div style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        flex: 1
                      }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px' }}>
                          {comment.authorName}
                        </div>
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              {showCommentInput[post.id] && currentUser && (
                <div style={{
                  marginTop: '16px',
                  paddingLeft: '63px',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[post.id] || ''}
                    onChange={(e) => setCommentText({
                      ...commentText,
                      [post.id]: e.target.value
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '1px solid #e1e8ed',
                      borderRadius: '24px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    style={{
                      backgroundColor: '#6B46C1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '10px 24px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;