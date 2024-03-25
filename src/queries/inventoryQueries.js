const createNewInventory = "INSERT INTO paint_inventory(color,quantity) VALUES ($1,$2);"

const updatePaintInventory = "UPDATE paint_inventory set quantity = $1 where id = $2;"

const getInventoryByName = "SELECT * FROM paint_inventory where color = $1;"

const getInventoryByID = "SELECT * FROM paint_inventory where id = $1;"

const getInventories = "SELECT * FROM paint_inventory;"

module.exports = {createNewInventory,updatePaintInventory,getInventoryByName,getInventoryByID,getInventories}
