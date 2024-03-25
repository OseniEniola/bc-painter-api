exports.seed = function(knex) {
  return knex('paint_inventory').del()
      .then(function () {
        return knex('paint_inventory').insert([
          { color: 'Blue', quantity: 100 },
          { color: 'Grey', quantity: 150 },
            { color: 'Black', quantity: 100 },
            { color: 'White', quantity: 100 },
            { color: 'Purple', quantity: 100 },
          // Add more seed data as needed
        ]);
      });
};
