exports.seed = function(knex) {
  return knex('orders').del()
      .then(function () {
        return knex('orders').insert([
          { address: '123 Main St', color: 'Red', paint_used: 10, order_status: 'PROCESSING', color_id: 1, painter_id: '1b81e9b8-650a-403a-beef-d8371b5c7f58' },
          { address: '456 Elm St', color: 'Blue', paint_used: 8, order_status: 'COMPLETED', color_id: 2, painter_id: '1b81e9b8-650a-403a-beef-d8371b5c7f58' },
          // Add more seed data as needed
        ]);
      });
};
