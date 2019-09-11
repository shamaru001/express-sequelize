const Router = require('express').Router();
const db = require('../models');

const {post, sequelize } = db;

const ROUTE_PATH = '/post';

//MANY
Router.get(ROUTE_PATH, async (req, res) => {
    const posts = await post.findAll();
    res.json(posts);
});

//ONE
Router.get(`${ROUTE_PATH}/:id`, async (req, res) => {
    const { id } = req.params;
    const thepost = await post.findByPk(id);

    if (thepost){
        res.json(thepost);
    } else {
        res.status(404).json({
            message: "Post not found"
        });
    }
});

//CREATE
Router.post(ROUTE_PATH, async (req, res) => {
    try {
        const created = await post.create(req.body);
        return res.status(201).json({
            post: created
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

Router.put(`${ROUTE_PATH}/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const [ updated ] = await post.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedPost = await post.findOne({ where: { id } });
            return res.status(200).json({ post: updatedPost });
        }
        throw new Error('Post not found');
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

//DELELE
Router.delete(`${ROUTE_PATH}/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await post.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(404).send(error.message);
    }
});



module.exports = Router