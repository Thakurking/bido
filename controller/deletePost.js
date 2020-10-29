const mongoose = require("mongoose");

const Post = require("../model/post");

/**
 *@module deletePost
 * @param {String} userId - Takes User id, will be removed by req.user
 * @param {String}  postId - takes Post id for deleting the selected post
 */

exports.deletePost = async (req, res) => {
  //userId will be removed by req.user after setting up middleware
  if (!req.user) {
    return res.json({ message: "Not Authorized", isSuccess: false });
  }
  const { postId } = req.body;
  if (!postId) {
    return res.json({ message: "Access Denied", isSuccess: false });
  }
  const delPost = await Post.deleteOne({ _id: postId });
  if (delPost) {
    return res.json({ message: "Post Deleted Successfully", isSuccess: true });
  } else {
    return res.json({ message: "Something Went Wrong", isSuccess: false });
  }
};
