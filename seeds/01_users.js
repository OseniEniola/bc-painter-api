exports.seed = function(knex) {
  return knex('users').del()
      .then(function () {
        return knex('users').insert([
          { first_name: 'John', last_name: 'Doe', email: 'john@example.com', role: 'ADMIN', phone: '123-456-7890', password: '$2b$10$jLoOMNpGEw06iQ7NkeC1ouL3V7GvP5VbdZcAH0W8UPRn7LWhcVx9m' },
          { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', role: 'MANAGER', phone: '123-456-7890', password: '$2b$10$jLoOMNpGEw06iQ7NkeC1ouL3V7GvP5VbdZcAH0W8UPRn7LWhcVx9m' },
          // Add more seed data as needed
        ]);
      });
};
