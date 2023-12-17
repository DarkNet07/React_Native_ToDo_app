/* eslint-disable no-console */
/* eslint-disable max-len */
const router = require('express').Router();

const { ToDo } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const toDos = await ToDo.findAll();
    return res.json({
      success: true,
      toDos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { toDoName, toDoDescription, isImportant } = req.body;
  try {
    const createdToDO = await ToDo.create({
      name: toDoName,
      description: toDoDescription,
      isImportant,
    });
    if (createdToDO) {
      return res.json(createdToDO);
    }
    return res.status(400).json({ message: 'Не получилось добавить задачу' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await ToDo.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updated[0] > 0) {
      return res.json(updated);
    }
    return res.status(400).json({ message: 'Не получилось изменить задачу' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      try {
        const deleted = await ToDo.destroy({
          where: { id },
        });
        if (deleted) {
          return res.sendStatus(204);
        }
        return res.status(400).json({ message: 'Не получилось удалить' });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    }
    return res.status(400).json({ message: 'Не получилось удалить задачу' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
