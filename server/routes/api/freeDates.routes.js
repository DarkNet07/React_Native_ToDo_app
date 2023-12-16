const router = require('express').Router();
// const { ValidationError, Sequelize } = require('sequelize');
const {
  Barist,
  FreeDate,
  // BaristasFreeDate,
  // sequelize,
} = require('../../db/models');

// роут достает свободные дни для баристы
router.get('/', async (req, res) => {
  const baristaId = res.locals.user?.baristaId;
  try {
    const barista = await Barist.findOne({
      include: {
        model: FreeDate,
        as: 'FreeDateBaristas',
        through: {
          attributes: [],
        },
      },
      where: { id: baristaId },
    });

    // очищаем объект от метаданных
    const freeDates = barista.FreeDateBaristas.map((d) => d.toJSON());
    res.json(freeDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// роут добавляет дату как свободную для бариста




module.exports = router;

// if (freeDate) {
//   await barista.removeFreeDateBaristas(freeDate);
//   const deleted = await FreeDate.destroy({
//     where: { id },
//   });
//   // await transaction.commit();
//   return res.send(204).json(freeDate);
// }
