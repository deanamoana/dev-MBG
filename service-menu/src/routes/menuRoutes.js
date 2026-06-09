const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/**
 * @openapi
 * /api/menu:
 *   get:
 *     summary: Ambil semua daftar menu beserta resepnya
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar menu
 *
 *   post:
 *     summary: Tambah paket menu baru (bisa nested dengan MenuRecipes)
 *     tags:
 *       - Menu
 *     responses:
 *       201:
 *         description: Menu berhasil ditambahkan
 */
router.get('/', menuController.getAllMenu);
router.post('/', menuController.createMenu);

/**
 * @openapi
 * /api/menu/process-production:
 *   post:
 *     summary: Proses produksi makan siang (otomatis potong stok di Inventory)
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_menu:
 *                 type: integer
 *               id_dapur:
 *                 type: integer
 *               jumlah_porsi:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produksi berhasil diproses
 */
router.post('/process-production', menuController.processProduction);

/**
 * @openapi
 * /api/menu/{id}/kebutuhan/{id_sekolah}:
 *   get:
 *     summary: Cek kebutuhan porsi menu untuk sekolah tertentu (API Aggregator)
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_sekolah
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data kebutuhan menu berhasil diambil
 */
router.get('/:id/kebutuhan/:id_sekolah', menuController.getMenuKebutuhan);

/**
 * @openapi
 * /api/menu/{id}:
 *   get:
 *     summary: Detail menu berdasarkan ID
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail menu berhasil diambil
 *
 *   put:
 *     summary: Update data menu
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu berhasil diperbarui
 *
 *   delete:
 *     summary: Hapus menu
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu berhasil dihapus
 */
router.get('/:id', menuController.getMenuById);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;