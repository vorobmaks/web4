const apiUrl = 'http://127.0.0.1:8000/api/teams/';

function clearContainer() {
    const container = document.getElementById('app');
    container.innerHTML = '';
}

function showError(message) {
    const container = document.getElementById('app');
    const errorDiv = document.createElement('div');
    errorDiv.style.color = '#dc3545';
    errorDiv.style.textAlign = 'center';
    errorDiv.textContent = message;
    container.prepend(errorDiv);
}

function renderTeamList() {
    clearContainer();
    const container = document.getElementById('app');

    container.innerHTML = `
        <button id="add-team-btn" style="margin-bottom: 20px;">Add New Team</button>
        <ul id="team-list"></ul>
    `;

    document.getElementById('add-team-btn').addEventListener('click', (e) => {
        e.preventDefault();
        renderTeamForm();
    });

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch teams');
            return response.json();
        })
        .then((teams) => {
            const teamList = document.getElementById('team-list');
            if (teams.length === 0) {
                teamList.innerHTML = '<li>No teams available.</li>';
                return;
            }
            teams.forEach((team) => {
                const li = document.createElement('li');
                li.textContent = team.team_name;
                li.style.cursor = 'pointer';
                li.style.padding = '5px 0';
                li.addEventListener('click', () => renderTeamDetail(team.id));
                teamList.appendChild(li);
            });
        })
        .catch(() => showError('Error loading teams.'));
}

function renderTeamDetail(id) {
    clearContainer();
    const container = document.getElementById('app');

    fetch(`${apiUrl}${id}/`)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch team');
            return response.json();
        })
        .then((team) => {
            container.innerHTML = `
                <h2>${team.team_name}</h2>
                <p><strong>City:</strong> ${team.city}</p>
                <p><strong>Stadium:</strong> ${team.stadium}</p>
                <button id="edit-btn" style="display: block; margin-bottom: 10px;">Edit</button>
                <button id="back-btn" style="display: block;">Back</button>
            `;

            document.getElementById('edit-btn').addEventListener('click', () => renderTeamForm(id));
            document.getElementById('back-btn').addEventListener('click', renderTeamList);
        })
        .catch(() => showError('Error loading team details.'));
}

function renderTeamForm(id = null) {
    clearContainer();
    const container = document.getElementById('app');
    const isEdit = id !== null;

    const formHtml = `
        <h2>${isEdit ? 'Edit' : 'Add'} Team</h2>
        <form id="team-form">
            <label for="name">Team Name:</label>
            <input type="text" id="name" required>

            <label for="city">City:</label>
            <input type="text" id="city" required>

            <label for="stadium">Stadium:</label>
            <input type="text" id="stadium" required>

            <button type="submit"
                style="background-color: #ffc107;
                       padding: 10px;
                       margin-top: 20px;
                       display: block;
                       width: 100%;
                       border: none;
                       cursor: pointer;">
                ${isEdit ? 'Save Changes' : 'Add Team'}
            </button>

            ${isEdit ? `
                <button type="button" id="delete-btn"
                    style="background-color: #ffc107;
                           padding: 10px;
                           margin-top: 10px;
                           display: block;
                           width: 100%;
                           border: none;
                           cursor: pointer;">
                    Delete Team
                </button>
            ` : ''}

            <button type="button" id="back-btn"
                style="background-color: transparent;
                       padding: 10px;
                       margin-top: 10px;
                       display: block;
                       width: 100%;
                       border: 1px solid #ccc;
                       cursor: pointer;">
                Back
            </button>
        </form>
    `;

    container.innerHTML = formHtml;

    document.getElementById('team-form').addEventListener('submit', (e) => saveTeam(e, id));
    document.getElementById('back-btn').addEventListener('click', renderTeamList);

    if (isEdit) {
        document.getElementById('delete-btn').addEventListener('click', () => deleteTeam(id));

        fetch(`${apiUrl}${id}/`)
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch team');
                return response.json();
            })
            .then((team) => {
                document.getElementById('name').value = team.team_name;
                document.getElementById('city').value = team.city;
                document.getElementById('stadium').value = team.stadium;
            })
            .catch(() => showError('Error loading team form.'));
    }
}

function saveTeam(event, id = null) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const city = document.getElementById('city').value.trim();
    const stadium = document.getElementById('stadium').value.trim();

    if (!name || !city || !stadium) {
        showError('Please fill in all fields.');
        return;
    }

    const data = { team_name: name, city, stadium };
    const isEdit = id !== null;
    const options = {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    fetch(isEdit ? `${apiUrl}${id}/` : apiUrl, options)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                renderTeamList();
            } else {
                throw new Error('Failed to save team');
            }
        })
        .catch(() => showError('Error saving team.'));
}

function deleteTeam(id) {
    fetch(`${apiUrl}${id}/`, { method: 'DELETE' })
        .then((response) => {
            if (response.status === 204) {
                renderTeamList();
            } else {
                throw new Error('Failed to delete team');
            }
        })
        .catch(() => showError('Error deleting team.'));
}

document.addEventListener('DOMContentLoaded', renderTeamList);
