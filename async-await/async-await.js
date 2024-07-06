document.getElementById('asyncAwaitBtn').addEventListener('click', async () => {
    document.getElementById('content').innerText = 'Loading...';

    try {
        const data = await fetchWithAsyncAwait('https://dummyjson.com/posts');
        const postTitles = data.posts.map(post => post.title).join('<br>');
        document.getElementById('content').innerHTML = postTitles;
    } catch (error) {
        document.getElementById('content').innerText = error;
    }
});

async function fetchWithAsyncAwait(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        clearTimeout(timeoutId);
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error.name === 'AbortError' ? 'Operation timed out' : 'Error fetching data';
    }
}
