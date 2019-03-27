const Tag = require('../models/tag');

module.exports = async (tags) => {
  let arrTags = [];
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    let findTag = await Tag.findOne({ name: tag });
    if (!findTag) {
      let createTag = await Tag.create({ name: tag });
      arrTags.push(createTag._id);
    } else {
      arrTags.push(findTag._id);
    }
  }
  return arrTags;
}
