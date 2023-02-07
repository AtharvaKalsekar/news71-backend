import mongoose from 'mongoose';

import { multimediaSchema } from './multimedia.js';

const Schema = mongoose.Schema;

const schema = new Schema({
  abstract: String,
  byline: String,
  created_date: String,
  des_facet: [String],
  item_type: String,
  kicker: String,
  material_type_facet: String,
  multimedia: [multimediaSchema],
  org_facet: [String],
  per_facet: [String],
  published_date: String,
  section: [String],
  short_url: String,
  subsection: String,
  title: String,
  updated_date: String,
  uri: String,
  url: String,
});

const Article = mongoose.model("Article", schema);

export default Article;
