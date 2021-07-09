// Write your "projects" router here!
const express = require('express');

const projects = require(`./projects-model`);
const middleware = require('./projects-middleware');
const { validateProject, validateId } = middleware;

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const result = await projects.get();
		res.status(200).json(result ?? []);
	} catch (err) {
		next(err)
	}
});

router.get('/:id', validateId, async (req, res) => {
	res.status(200).json(req.project);
});

router.post('/', validateProject, async (req, res, next) => {
	try {
		const result = await projects.insert(req.project);
		if (result)
			res.status(201).json(result);
		else
			res.status(400).send("Unknown fail");
	} catch (err) {
		next(err);
	}
});

router.put('/:id', validateId, validateProject, async (req, res, next) => {
	try {
		const result = await projects.update(req.params.id, req.project);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/', validateId, async (req, res, next) => {
	projects.delete(req.projectId);
});

router.use((err, req, res, next) => {
	console.log("ooh an err", err);
	res.status(500).json({ message: err.message });
})

module.exports = router;
