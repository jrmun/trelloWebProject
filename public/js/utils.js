async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export { fetchData };
