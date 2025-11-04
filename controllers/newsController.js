// Get News Data from News API based on user preferences
const axios = require('axios');

const getNewsByPreferences = async (preferences) => {
    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey || apiKey.length === 0) {
        throw new Error("GNEWS_API_KEY is not defined in environment variables.");
    }
    // if Array then get only first element
    // if string then use directly
    const rawCategory = Array.isArray(preferences)
        ? (preferences.length > 0 ? preferences[0] : 'general')
        : (typeof preferences === 'string' && preferences.length > 0 ? preferences : 'general');
    const category = encodeURIComponent(String(rawCategory).trim());
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apiKey}&lang=en`;

    try {
        const response = await axios.get(url);
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error("Could not fetch news at this time.");
    }
}

module.exports = { getNewsByPreferences };