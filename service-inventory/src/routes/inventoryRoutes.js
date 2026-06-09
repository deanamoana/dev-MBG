const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @openapi
 * /api/inventory:
 *   get:
 *     summary: Ambil semua daftar stok bahan baku
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: Berhasil mengambil data inventory
 *
 *   post:
 *     summary: Tambah bahan baku baru
 *     tags:
 *       - Inventory
 *     responses:
 *       201:
 *         description: Bahan baku berhasil ditambahkan
 */
router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.createInventory);

/**
 * @openapi
 * /api/inventory/reduce-bulk:
 *   post:
 *     summary: Mengurangi stok dalam jumlah banyak (Dipanggil oleh Service Menu)
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: Stok berhasil dikurangi
 */
router.post('/reduce-bulk', inventoryController.reduceBulkStock);

/**
 * @openapi
 * /api/inventory/dapur/{id_dapur}:
 *   get:
 *     summary: Filter stok berdasarkan ID Dapur
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id_dapur
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data inventory berdasarkan dapur
 */
router.get('/dapur/:id_dapur', inventoryController.getInventoryByDapur);

/**
 * @openapi
 * /api/inventory/{id}:
 *   get:
 *     summary: Detail stok berdasarkan ID
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail inventory
 *
 *   put:
 *     summary: Update data stok
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory berhasil diperbarui
 *
 *   delete:
 *     summary: Hapus bahan baku
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory berhasil dihapus
 */
router.get('/:id', inventoryController.getInventoryById);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;