import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  // Function to handle posting a new idea
  const handlePost = () => {
    if (newPostText.trim() === '' && newPostImage === null) {
      alert('Please enter some text or attach an image.');
      return;
    }

    const newPost = {
      id: posts.length + 1,
      text: newPostText,
      image: newPostImage,
      likes: 0,
      timestamp: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostImage(null);
  };

  // Function to handle liking a post
  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to render posts sorted by likes or timestamp
  const renderPosts = () => {
    return posts.map(post => (
      <View key={post.id} style={styles.postContainer}>
        <Text style={styles.postText}>{post.text}</Text>
        {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
        <Text style={styles.timestampText}>{post.timestamp}</Text>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(post.id)}>
          <Text style={styles.likeButtonText}>{`Like (${post.likes})`}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  // Function to show trending posts (most likes)
  const showTrendingPosts = () => {
    const trendingPosts = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(trendingPosts);
  };

  // Function to show newest posts (latest timestamp)
  const showNewestPosts = () => {
    const newestPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPosts(newestPosts);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Forum Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Share your idea..."
          multiline
          value={newPostText}
          onChangeText={text => setNewPostText(text)}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={showTrendingPosts}>
          <Text style={styles.filterButtonText}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={showNewestPosts}>
          <Text style={styles.filterButtonText}>New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>{renderPosts()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postsContainer: {
    width: '90%',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    lineHeight: 21,
    color: Colors.BLACK,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  timestampText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  likeButton: {
    backgroundColor: '#ADD8E6',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  likeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
