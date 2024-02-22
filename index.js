// Import required modules
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from '/node_modules/passport-local/index.js';
import session from 'express-session';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy setup for local authentication
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Replace this with your authentication logic (e.g., check against a database)
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

// Serialize user information for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from session storage
passport.deserializeUser((id, done) => {
  // Replace this with your logic to fetch user from the database
  done(null, { id: 1, username: 'user' });
});

// Define login route and handle authentication
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

// Define logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

// Define user route to retrieve user information
app.get('/user', (req, res) => {
  res.json({ user: req.user });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  
// Main ____________________________________//

// Smooth scroll to section when clicking on links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Login Section ____________________________________//

// Journal Section ____________________________________//

// Sample posts data (in-memory storage, replace with server-side storage)
let posts = [];

// Function to add a new post
function addPost() {
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    if (postTitle.trim() !== '' && postContent.trim() !== '') {
        const post = {
            title: postTitle,
            content: postContent,
            comments: []
        };
        posts.push(post);
        displayPosts();
        clearForm();
        // Scroll to the newly added post
        const postsContainer = document.getElementById('posts-container');
        const newPostElement = postsContainer.lastChild;
        newPostElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h2>${post.title}</h2>`;
        postElement.innerHTML += `<p>${post.content}</p>`;
        postElement.innerHTML += `<button onclick="addComment(${index})">Add Comment</button>`;

        // Display comments
        if (post.comments.length > 0) {
            postElement.innerHTML += '<h3>Comments:</h3>';
            post.comments.forEach(comment => {
                postElement.innerHTML += `<p>${comment}</p>`;
            });
        }

        postsContainer.appendChild(postElement);
    });
}


// Function to add a comment to a post
function addComment(postIndex) {
    const comment = prompt('Enter your comment:');
    if (comment !== null) {
        posts[postIndex].comments.push(comment);
        displayPosts();
    }
}

// Function to clear the form after adding a post
function clearForm() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
}

// Initial display of posts
displayPosts();
