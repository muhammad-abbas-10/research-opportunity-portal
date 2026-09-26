const db = require('../db');

// CREATE
exports.createOpportunity = async (req, res) => {
    try {
        const {
            title, description, research_area, faculty_name,
            department, required_skills, positions_available,
            application_deadline, status
        } = req.body;

        // Basic validation
        if (!title || !description || !research_area || !faculty_name ||
            !department || !required_skills || !positions_available || !application_deadline) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const [result] = await db.query(
            `INSERT INTO opportunities 
            (title, description, research_area, faculty_name, department, required_skills, positions_available, application_deadline, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, research_area, faculty_name, department, required_skills, positions_available, application_deadline, status || 'Open']
        );

        res.status(201).json({ message: 'Opportunity created', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET ALL
exports.getAllOpportunities = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM opportunities ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET ONE
exports.getOpportunityById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM opportunities WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// UPDATE
exports.updateOpportunity = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title, description, research_area, faculty_name,
            department, required_skills, positions_available,
            application_deadline, status
        } = req.body;

        // Check if it exists first
        const [existing] = await db.query('SELECT * FROM opportunities WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        if (!title || !description || !research_area || !faculty_name ||
            !department || !required_skills || !positions_available || !application_deadline) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        await db.query(
            `UPDATE opportunities SET 
            title = ?, description = ?, research_area = ?, faculty_name = ?, 
            department = ?, required_skills = ?, positions_available = ?, 
            application_deadline = ?, status = ? 
            WHERE id = ?`,
            [title, description, research_area, faculty_name, department, required_skills, positions_available, application_deadline, status, id]
        );

        res.status(200).json({ message: 'Opportunity updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// DELETE
exports.deleteOpportunity = async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await db.query('SELECT * FROM opportunities WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        await db.query('DELETE FROM opportunities WHERE id = ?', [id]);
        res.status(200).json({ message: 'Opportunity deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};