// Write your "actions" router here!
const express = require('express');
const actions = require('./actions-model');
const { validateId, validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
	actions.get().then(actions => {
		res.status(200).json(actions ?? []);
	}, err => next(err));
});

router.get('/:id', validateId, (req, res) => {
	res.status(200).json(req.action);
});

router.post('/', validateAction, (req, res, next) => {
	actions.insert(req.action).then(result => {
		if (result)
			res.status(201).json(result);
		else
			res.status(400).send();
	}, err => next(err));
});

router.put('/:id', validateId, validateAction, (req, res, next) => {
	actions.update(req.actionId, req.action).then(result => {
		res.status(200).json(result)
	}, err => next(err));
});

router.delete('/:id', validateId, (req, res, next) => {
	actions.remove(req.actionId).then(result => {
		if (result)
			res.status(200).send();
		else
			res.status(400).send("Could not delete");
	}, err => next(err));
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
	console.log("ooh an err", err);
	res.status(500).json({ message: err.message });
})

module.exports = router;
