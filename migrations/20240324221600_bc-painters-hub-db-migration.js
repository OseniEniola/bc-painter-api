exports.up = async function(knex) {
    //Create uuid function
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // Create 'orders' table
    await knex.schema.createTable('orders', function(table) {
        table.increments('id').primary();
        table.string('address', 255).notNullable();
        table.string('color', 255).notNullable();
        table.integer('paint_used').notNullable();
        table.enum('order_status', ['PROCESSING', 'COMPLETED', 'CANCELLED']).notNullable();
        table.integer('color_id').notNullable();
        table.uuid('painter_id').notNullable();
    });

    // Create 'paint_inventory' table
    await knex.schema.createTable('paint_inventory', function(table) {
        table.increments('id').primary();
        table.string('color', 255).notNullable();
        table.integer('quantity');
    });

    // Create 'users' table
    await knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('first_name', 255);
        table.string('last_name', 255);
        table.string('phone', 255);
        table.enum('role', ['ADMIN', 'MANAGER', 'PAINTER', 'SYS_ADMIN']).notNullable();
        table.uuid('user_id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable();
        table.string('email', 255).notNullable().defaultTo('unknown@example.com');
        table.string('password', 255).notNullable().defaultTo('$2b$10$BUmnntWWT3VtC3S75lFyZeUrtqBUs2TPnjroDWfmW.S1tH5HMSwl2');
    });


    // Check if the unique constraint already exists before adding it
    const constraintExists = await knex.schema.hasTable('users_email_unique');
    if (!constraintExists) {
        await knex.schema.alterTable('users', function(table) {
            table.unique('email', 'users_email_unique');
        });
    }
};

exports.down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('paint_inventory');
    await knex.schema.dropTableIfExists('orders');
    await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
