// Write your "projects" router here!
const express = require('express');

const projects = require('./projects-model');
// const { validateProject, validateId } = require('./projects-middleware');

const router = express.Router();

// router.get('/', async (req, res, next) => {
// 	try {
// 		const result = await projects.get();
// 		res.status(200).json(result ?? []);
// 	} catch (err) {
// 		next(err)
// 	}
// });

// router.get('/:id',  (req, res) => {
// 	res.status(200).json(req.project);
// });

// router.post('/',  async (req, res, next) => {
// 	try {
// 		const result = await projects.insert(req.project);
// 		if (result)
// 			res.status(201).json(result);
// 		else
// 			res.status(400).send("Unknown fail");
// 	} catch (err) {
// 		next(err);
// 	}
// });

router.put('/:id',  async (req, res, next) => {
	try {
		const result = await projects.update(req.params.id, req.project);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', (req, res, next) => {
	projects.remove(req.projectId)
		.then(result => {
			if (result)
				res.status(200).send();
			else
				res.status(400).message("could not be deleted");
		}, err => next(err));
});

router.get('/:id/actions',  async (req, res, next) => {
	try {
		const result = await projects.getProjectActions(req.projectId);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
	console.log("ooh an err", err);
	res.status(500).json({ message: err.message });
})

module.exports = router;
