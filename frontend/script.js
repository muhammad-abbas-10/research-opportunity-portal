const API_BASE = 'http://localhost:5000/api/opportunities';

// ---------- Shared helpers ----------

function showMessage(text, type) {
    const box = document.getElementById('message-box');
    if (!box) return;
    box.textContent = text;
    box.className = 'message ' + type;
    box.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        box.classList.add('hidden');
    }, 4000);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toISOString().split('T')[0];
}

// ---------- INDEX PAGE LOGIC ----------

async function loadOpportunities() {
    const listEl = document.getElementById('opportunity-list');
    if (!listEl) return;

    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error('Failed to load opportunities');
        const data = await res.json();

        if (data.length === 0) {
            listEl.innerHTML = '<p>No research opportunities posted yet.</p>';
            return;
        }

        listEl.innerHTML = data.map(opp => `
            <a class="card" href="details.html?id=${opp.id}">
                <h3>${escapeHtml(opp.title)}</h3>
                <p><strong>Faculty:</strong> ${escapeHtml(opp.faculty_name)}</p>
                <p><strong>Department:</strong> ${escapeHtml(opp.department)}</p>
                <p><strong>Area:</strong> ${escapeHtml(opp.research_area)}</p>
                <p><strong>Deadline:</strong> ${formatDate(opp.application_deadline)}</p>
                <span class="badge ${opp.status}">${opp.status}</span>
            </a>
        `).join('');
    } catch (err) {
        listEl.innerHTML = '<p>Could not load opportunities. Is the backend server running?</p>';
        console.error(err);
    }
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function setupCreateForm() {
    const form = document.getElementById('create-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            research_area: document.getElementById('research_area').value.trim(),
            faculty_name: document.getElementById('faculty_name').value.trim(),
            department: document.getElementById('department').value.trim(),
            required_skills: document.getElementById('required_skills').value.trim(),
            positions_available: Number(document.getElementById('positions_available').value),
            application_deadline: document.getElementById('application_deadline').value,
            status: 'Open'
        };

        // Basic frontend validation
        for (const key in payload) {
            if (payload[key] === '' || payload[key] === null || Number.isNaN(payload[key])) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
        }

        try {
            const res = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                showMessage(result.message || 'Something went wrong.', 'error');
                return;
            }

            showMessage('Opportunity posted successfully!', 'success');
            form.reset();
            loadOpportunities();
        } catch (err) {
            showMessage('Could not reach the server.', 'error');
            console.error(err);
        }
    });
}

// ---------- DETAILS PAGE LOGIC ----------

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadOpportunityDetails() {
    const viewEl = document.getElementById('details-view');
    if (!viewEl) return;

    const id = getIdFromUrl();
    if (!id) {
        viewEl.innerHTML = '<p>No opportunity ID provided.</p>';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/${id}`);

        if (res.status === 404) {
            viewEl.innerHTML = '<p>This opportunity was not found. It may have been deleted.</p>';
            document.getElementById('edit-form').classList.add('hidden');
            document.getElementById('toggle-status-btn').classList.add('hidden');
            return;
        }

        if (!res.ok) throw new Error('Failed to load opportunity');

        const opp = await res.json();

        viewEl.innerHTML = `
            <h2>${escapeHtml(opp.title)}</h2>
            <div class="detail-row"><strong>Description:</strong> ${escapeHtml(opp.description)}</div>
            <div class="detail-row"><strong>Research Area:</strong> ${escapeHtml(opp.research_area)}</div>
            <div class="detail-row"><strong>Faculty:</strong> ${escapeHtml(opp.faculty_name)}</div>
            <div class="detail-row"><strong>Department:</strong> ${escapeHtml(opp.department)}</div>
            <div class="detail-row"><strong>Required Skills:</strong> ${escapeHtml(opp.required_skills)}</div>
            <div class="detail-row"><strong>Positions Available:</strong> ${opp.positions_available}</div>
            <div class="detail-row"><strong>Deadline:</strong> ${formatDate(opp.application_deadline)}</div>
            <div class="detail-row"><strong>Status:</strong> <span class="badge ${opp.status}">${opp.status}</span></div>
        `;

        // Pre-fill the edit form
        document.getElementById('opp-id').value = opp.id;
        document.getElementById('title').value = opp.title;
        document.getElementById('description').value = opp.description;
        document.getElementById('research_area').value = opp.research_area;
        document.getElementById('faculty_name').value = opp.faculty_name;
        document.getElementById('department').value = opp.department;
        document.getElementById('required_skills').value = opp.required_skills;
        document.getElementById('positions_available').value = opp.positions_available;
        document.getElementById('application_deadline').value = formatDate(opp.application_deadline);
        document.getElementById('status').value = opp.status;

    } catch (err) {
        viewEl.innerHTML = '<p>Could not load this opportunity. Is the backend server running?</p>';
        console.error(err);
    }
}

function setupEditForm() {
    const form = document.getElementById('edit-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('opp-id').value;

        const payload = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            research_area: document.getElementById('research_area').value.trim(),
            faculty_name: document.getElementById('faculty_name').value.trim(),
            department: document.getElementById('department').value.trim(),
            required_skills: document.getElementById('required_skills').value.trim(),
            positions_available: Number(document.getElementById('positions_available').value),
            application_deadline: document.getElementById('application_deadline').value,
            status: document.getElementById('status').value
        };

        for (const key in payload) {
            if (payload[key] === '' || payload[key] === null || Number.isNaN(payload[key])) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
        }

        try {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                showMessage(result.message || 'Something went wrong.', 'error');
                return;
            }

            showMessage('Opportunity updated successfully!', 'success');
            loadOpportunityDetails();
        } catch (err) {
            showMessage('Could not reach the server.', 'error');
            console.error(err);
        }
    });
}

function setupToggleStatusButton() {
    const btn = document.getElementById('toggle-status-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const statusSelect = document.getElementById('status');
        statusSelect.value = statusSelect.value === 'Open' ? 'Closed' : 'Open';
        showMessage(`Status set to ${statusSelect.value}. Click "Save Changes" to confirm.`, 'success');
    });
}

function setupDeleteButton() {
    const btn = document.getElementById('delete-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const id = document.getElementById('opp-id').value;
        const confirmed = confirm('Are you sure you want to delete this opportunity? This cannot be undone.');
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            const result = await res.json();

            if (!res.ok) {
                showMessage(result.message || 'Could not delete this opportunity.', 'error');
                return;
            }

            showMessage('Opportunity deleted. Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        } catch (err) {
            showMessage('Could not reach the server.', 'error');
            console.error(err);
        }
    });
}

// ---------- INIT ----------

document.addEventListener('DOMContentLoaded', () => {
    // Index page
    loadOpportunities();
    setupCreateForm();

    // Details page
    loadOpportunityDetails();
    setupEditForm();
    setupToggleStatusButton();
    setupDeleteButton();
});
