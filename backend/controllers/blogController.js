const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).json(newBlog);
};

exports.updateBlog = async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBlog);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};
