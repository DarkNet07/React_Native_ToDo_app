const { ToDo } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ToDo.bulkCreate([
      {
        name: 'Прогулять с собакой',
        description: 'Обязательно! Не забыть прогулять с Джеком в 09:00',
        isImportant: true,
      },
      {
        name: 'Почитать до видеоконференции про EventLoop',
        description:
          'Нужно хотя бы пару видеороликов посмотреть, чтобы закрепить знания',
        isImportant: true,
      },
      {
        name: 'Поговорить с Машей о жизни...',
        description: 'Не плохо было-бы высказаться после такой тяжелой недели!',
        isImportant: true,
      },
      {
        name: 'Купить продукты',
        description: 'Молоко, яйца, хлеб',
        isImportant: true,
      },
      {
        name: 'Подготовить презентацию',
        description: 'Для встречи с клиентом',
        isImportant: false,
      },
      {
        name: 'Прочитать новую книгу',
        description: 'Роман "Великий Гэтсби"',
        isImportant: true,
      },
      {
        name: 'Сделать зарядку',
        description: 'Не забыть про физическую активность!',
        isImportant: false,
      },
      {
        name: 'Записать новую идею',
        description: 'Для проекта по разработке приложения',
        isImportant: true,
      },
      {
        name: 'Позвонить бабушке',
        description: 'Узнать как она себя чувствует',
        isImportant: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await ToDo.destroy({ truncate: { cascade: true } });
  },
};

