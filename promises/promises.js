document.getElementById('promiseBtn').addEventListener('click', () => {
    document.getElementById('content').innerText = 'Loading...';
    
    fetchWithPromise('https://dummyjson.com/posts')
        .then(data => {
            const postTitles = data.posts.map(post => post.title).join('<br>');
            document.getElementById('content').innerHTML = postTitles;
        })
        .catch(error => {
            document.getElementById('content').innerText = error;
        });
});

function fetchWithPromise(url) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject('Operation timed out');
        }, 5000);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                clearTimeout(timeout);
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timeout);
                reject('Error fetching data');
            });
    });
}
