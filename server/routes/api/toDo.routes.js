/* eslint-disable no-console */
/* eslint-disable max-len */
const router = require('express').Router();

const { ToDo } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    // проверить, есть ли такой юзер в бд
    const toDos = await ToDo.findAll();
    // отправляем ответ
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
  const { toDoName, toDoDescription } = req.body;
  try {
    const createdToDO = await ToDo.create({
      name: toDoName,
      description: toDoDescription,
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
      returning: true, // если нужно, чтобы вернулась сущность, которая изменилась
    });
    if (updated[0] > 0) {
      return res.json(updated);
      // return res.json(updated[1])// вернется массив измененных сущностей
    }
    return res.status(400).json({ message: 'Не получилось изменить задачу' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id, 'это id!');
  console.log(typeof id, 'это TYPE id!');

  try {
    if (id) {
      try {
        const deleted = await ToDo.destroy({
          where: { id },
        });
        console.log(deleted, ' deleted element');
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
