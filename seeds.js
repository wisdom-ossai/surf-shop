const Post = require('./models/post.model');
const faker = require('faker');

async function seedPosts() {
    await Post.remove({});

    for (const post of new Array(40)) {
        const post = await {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id': '5e67a9349eaa032a5855490a',
                'username': 'Chuks'
            }
        }
        await Post.create(post);
    }

    console.log('40 posts created');
}

module.exports = seedPosts;