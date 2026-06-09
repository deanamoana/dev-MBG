const express = require('express');
const router = express.Router();
const shipmentsController = require('../controllers/shipmentsController');

/**
 * @openapi
 * /api/distribusi:
 *   get:
 *     summary: Ambil semua data pengiriman (data agregat dari Dapur, Menu, dan Sekolah)
 *     tags:
 *       - Distribusi
 *     responses:
 *       200:
 *         description: Berhasil mengambil data pengiriman
 *
 *   post:
 *     summary: Buat jadwal pengiriman baru
 *     tags:
 *       - Distribusi
 *     responses:
 *       201:
 *         description: Jadwal pengiriman berhasil dibuat
 */
router.get('/', shipmentsController.getAllShipments);
router.post('/', shipmentsController.createShipment);

/**
 * @openapi
 * /api/distribusi/{id}:
 *   get:
 *     summary: Detail pengiriman berdasarkan ID
 *     tags:
 *       - Distribusi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail pengiriman berhasil diambil
 *
 *   put:
 *     summary: Update status pengiriman dan waktu sampai otomatis
 *     tags:
 *       - Distribusi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data pengiriman berhasil diperbarui
 *
 *   delete:
 *     summary: Hapus riwayat pengiriman
 *     tags:
 *       - Distribusi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Riwayat pengiriman berhasil dihapus
 */
router.get('/:id', shipmentsController.getShipmentById);
router.put('/:id', shipmentsController.updateShipment);
router.delete('/:id', shipmentsController.deleteShipment);

module.exports = router;