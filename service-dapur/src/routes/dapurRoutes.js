const express = require('express');
const router = express.Router();
const dapurController = require('../controllers/dapurController');

/**
 * @openapi
 * /api/dapur:
 *   get:
 *     summary: Ambil semua daftar dapur
 *     tags:
 *       - Dapur
 *     responses:
 *       200:
 *         description: Berhasil mengambil data dapur
 *
 *   post:
 *     summary: Registrasi dapur baru
 *     tags:
 *       - Dapur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_dapur:
 *                 type: string
 *               lokasi:
 *                 type: string
 *               kapasitas_porsi:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Dapur berhasil ditambahkan
 */
router.get('/', dapurController.getAllDapur);
router.post('/', dapurController.createDapur);

/**
 * @openapi
 * /api/dapur/{id}:
 *   get:
 *     summary: Detail dapur berdasarkan ID
 *     tags:
 *       - Dapur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail dapur berhasil diambil
 *
 *   put:
 *     summary: Update data dapur
 *     tags:
 *       - Dapur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data dapur berhasil diperbarui
 *
 *   delete:
 *     summary: Hapus data dapur
 *     tags:
 *       - Dapur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data dapur berhasil dihapus
 */
router.get('/:id', dapurController.getDapurById);
router.put('/:id', dapurController.updateDapur);
router.delete('/:id', dapurController.deleteDapur);

module.exports = router;