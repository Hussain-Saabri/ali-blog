const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function getPost(id) {
    try {
        const res = await fetch(`${baseURL}/api/posts`);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const posts = await res.json();

        if (id) {
            return posts.find(value => value.id == id);
        }

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return null; // Return null or an empty array as fallback
    }
}
