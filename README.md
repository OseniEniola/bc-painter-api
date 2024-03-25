# A Paint Company - Stock Status Web Application

## Overview
This web application provides a platform for managing paint inventory status for A Paint Company. It allows managers and painters to view the availability of paints, update inventory, and manage user roles and permissions.

## User Roles
1. **John (Painter)**: Assigns houses to be painted. Uses a mobile phone as the primary device.
2. **Jane (Manager)**: Manages paint orders and occasionally paints. Comfortable with technology. Prefers laptop or tablet but also has a cell phone.
3. **Adam (Systems Admin)**: Manages users, roles, and permissions.

## Story Implementation

### John's Story
- **View Paint Availability**: John can view a list of paint availability to assign houses to be painted.

### Jane's Story
- **View Paint Availability**: Jane can view a list of paint availability to plan bulk orders and update inventory.
- **Update Paint Inventory**: Jane can update paint inventory when bulk orders come in.

### Painter's Story
- **View Paint Availability**: Painters can view paint availability for pickup.
- **Update Paint Inventory**: Painters can quickly update paint inventory as they use it.

### Adam's Story
- **Manage Users**: Adam can manage users, their roles, and permissions.

# Using Knex for Database Migrations and Seeding in Express

This README provides guidance on using Knex to manage database migrations and seeding in an Express application.

## Installation

To use Knex for database migrations and seeding in your Express app, you need to install Knex and other required dependencies:

```bash
npm install knex pg bcrypt


### Step 3: Configuration
Explain how to configure Knex to connect to your database in the Express app.

```markdown
## Configuration

1. Create a Knexfile.js in the root directory of your project:

```javascript
// Knexfile.js

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'your_database_host',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};

````
### Step 4: Running Migrations
Provide instructions on how to run migrations using Knex CLI.

```markdown
## Running Migrations

To run database migrations, use the Knex CLI:

```bash
npx knex migrate:latest

````
### Step 5: Seeding Database
Explain how to seed the database using Knex CLI.

```markdown
## Seeding Database

To seed the database with initial data, use the Knex CLI:

```bash
npx knex seed:run


````
# Paint Inventory API

This API manages the inventory of paint colors and quantities for A Paint Company.

## Endpoints

- `GET /api/inventory`: Get all paint inventory items.
- `POST /api/inventory/create`: Create a new paint inventory item.
- `PUT /api/inventory/update`: Update the quantity of a paint inventory item.

## Request Parameters

### `POST /api/inventory/create`

- `color` (string, required): The color of the paint.
- `quantity` (integer, required): The quantity of paint available.

### `PUT /api/inventory/update`

- `color_id` (integer, required): The ID of the paint color to update.
- `quantity` (integer, required): The new quantity of paint.

## Response

All endpoints return JSON objects with the following structure:

```json
{
  "status": 200,
  "data": {...}
}
```

## Authentication

No authentication is required to access the API.

## Error Handling

Errors are returned with appropriate status codes and error messages in the response body.

## Usage Examples

### Create Paint Inventory Item

```bash
curl -X POST http://localhost:3000/api/inventory/create -d '{"color": "Blue", "quantity": 10}' -H 'Content-Type: application/json'
```

### Update Paint Inventory Quantity

```bash
curl -X PUT http://localhost:3000/api/inventory/update -d '{"color_id": 1, "quantity": 15}' -H 'Content-Type: application/json'
```

## Deployment

To deploy this API, make sure you have Node.js and PostgreSQL installed. Then, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repo.git`
2. Install dependencies: `npm install`
3. Set up database connection in `dbConfig.js`
4. Start the server: `npm start`

## Testing

To test the API, run: `npm test`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact Information

For support or questions, contact support@paintcompany.com.

## License

This project is licensed under the MIT License.

# Paint Order API Documentation

This API manages paint orders for A Paint Company. It allows users to create new orders, complete orders, and retrieve orders by painter ID.

## Endpoints

- `GET /api/orders`: Get all orders.
- `POST /api/orders/create`: Create a new order.
- `PUT /api/orders/complete`: Complete an order.
- `GET /api/orders/:painter_id`: Get orders by painter ID.

## Request Parameters

### `POST /api/orders/create`

- `address` (string, required): The address where painting is to be done.
- `color` (string, required): The color of paint for the order.
- `color_id` (integer, required): The ID of the paint color.
- `painter_id` (string, required): The ID of the painter assigned to the order.

### `PUT /api/orders/complete`

- `order_id` (integer, required): The ID of the order to complete.
- `painter_id` (string, required): The ID of the painter completing the order.
- `no_paint_used` (integer, required): The quantity of paint used for the order.
- `color_id` (integer, required): The ID of the paint color used for the order.

### `GET /api/orders/:painter_id`

- `painter_id` (string, required): The ID of the painter to retrieve orders for.

## Response

All endpoints return JSON objects with the following structure:

```json
{
  "status": 200,
  "data": {...}
}
# User API Endpoints

This Express router defines the following API endpoints for user management:

## GET /

- **Description:** Retrieves a list of all users.
- **Usage:** Send a GET request to `/` to fetch all users.
- **Authentication:** Required (Admin role)
- **Controller:** `userController.getUsers`

## GET /painters

- **Description:** Retrieves a list of all painters.
- **Usage:** Send a GET request to `/painters` to fetch all painters.
- **Authentication:** Required (Admin role)
- **Controller:** `userController.getAllPainters`

## PUT /update

- **Description:** Updates user details.
- **Usage:** Send a PUT request to `/update` with the user details to update.
- **Authentication:** Required (Admin role)
- **Request Body:**
  - user_id (integer): ID of the user to update
  - first_name (string, optional): Updated first name
  - last_name (string, optional): Updated last name
  - email (string, optional): Updated email
  - role (string, optional): Updated role
  - phone (string, optional): Updated phone number
- **Controller:** `userController.updateUser`

## POST /create

- **Description:** Creates a new user.
- **Usage:** Send a POST request to `/create` with the user details to create a new user.
- **Authentication:** Required (Admin role)
- **Request Body:**
  - first_name (string): First name of the user
  - last_name (string): Last name of the user
  - email (string): Email of the user
  - role (string): Role of the user
  - phone (string): Phone number of the user
  - password (string): Password of the user
- **Controller:** `userController.createNewUser`

## POST /login

- **Description:** Logs in a user.
- **Usage:** Send a POST request to `/login` with the user's email and password to log in.
- **Authentication:** Not required
- **Request Body:**
  - email (string): Email of the user
  - password (string): Password of the user
- **Controller:** `userController.login`


