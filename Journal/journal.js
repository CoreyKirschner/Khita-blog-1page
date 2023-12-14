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
