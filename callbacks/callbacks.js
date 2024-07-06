document.getElementById('callbackBtn').addEventListener('click', () => {
    simulateDelay(5000, () => {
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                const postTitles = data.posts.map(post => post.title).join('<br>');
                document.getElementById('content').innerHTML = postTitles;
            });
    });
});

function simulateDelay(ms, callback) {
    setTimeout(callback, ms);
}