const request = require('request');
const cheerio = require('cheerio');

async function joox(query) {
    // URL pencarian lagu di Joox.com
    const url = `https://www.joox.com/id/search/all?q=${query}`;

    // Mengirim permintaan GET ke URL
    request(url, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        // Parsing halaman HTML dengan Cheerio
        const $ = cheerio.load(body);

        // Menyaring hasil pencarian lagu
        const results = [];
        $('.songlist-item').each((index, element) => {
            const title = $(element).find('.songlist-title').text().trim();
            const artist = $(element).find('.songlist-artist').text().trim();
            const album = $(element).find('.songlist-album').text().trim();
            results.push({ title, artist, album });
        });

        console.log(`Hasil pencarian untuk '${query}':`);
        results.forEach((result, index) => {
            console.log(`[${index + 1}] Title: ${result.title}`);
            console.log(`    Artist: ${result.artist}`);
            console.log(`    Album: ${result.album}`);
        });
    });
}

module.exports.joox = joox
