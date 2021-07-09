// Write your "projects" router here!
const express = require('express');

const projects = require(`./projects-model`);
const middleware = require('./projects-middleware');
const { validateProject } = middleware;

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const result = await projects.get();
		res.status(200).json(result ?? []);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const result = await projects.get(req.params.id);
		if (result)
			res.status(200).json(result);
		else
			res.status(404).send("Not found!");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/', validateProject, async (req, res) => {
	try {
		const result = await projects.insert(req.newPost);
		if (result)
			res.status(201).json(result);
		else
			res.status(400).send("Unknown fail");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
