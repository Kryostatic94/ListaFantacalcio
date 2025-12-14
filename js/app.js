/**
 * Main Application
 * Gestisce la logica principale dell'applicazione Fantacalcio
 */
import { Player } from './Player.js';
import { Team } from './Team.js';
import { UI } from './UI.js';
import { Storage } from './Storage.js';

class FantacalcioApp {
  constructor() {
    this.team = null;
    this.ui = new UI();
    this.storage = new Storage();
    this.initialized = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSavedData();
  }

  setupEventListeners() {
    document.getElementById('setup-credits-btn')?.addEventListener('click', () => {
      this.ui.showModal('credits-modal');
    });

    document.getElementById('credits-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreditsSetup();
    });

    document.getElementById('cancel-credits')?.addEventListener('click', () => {
      this.ui.hideModal('credits-modal');
    });

    document.getElementById('add-player-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddPlayer();
    });

    document.getElementById('cancel-add-player')?.addEventListener('click', () => {
      this.ui.hideModal('add-player-modal');
    });

    document.getElementById('setup-team-name-btn')?.addEventListener('click', () => {
      this.ui.showModal('team-name-modal');
    });

    document.getElementById('team-name-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTeamNameSetup();
    });

    document.getElementById('cancel-team-name')?.addEventListener('click', () => {
      this.ui.hideModal('team-name-modal');
    });

    document.getElementById('export-pdf-btn')?.addEventListener('click', () => {
      this.exportToPDF();
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => {
      this.resetTeam();
    });

    document.getElementById('save-btn')?.addEventListener('click', () => {
      this.saveTeam();
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.ui.hideModal(modal.id);
        }
      });
    });
  }

  loadSavedData() {
    const savedData = this.storage.load();
    if (savedData) {
      this.team = Team.fromJSON(savedData);
      this.initialized = true;
      this.updateUI();
      this.ui.showSuccess('Dati caricati con successo!');
    }
  }

  handleCreditsSetup() {
    const creditsInput = document.getElementById('credits-input');
    const credits = parseInt(creditsInput.value);

    if (!credits || credits <= 0) {
      this.ui.showError('Inserisci un valore valido di crediti');
      return;
    }

    if (!this.team) {
      this.team = new Team(credits);
      this.initialized = true;
    } else {
      this.team.setCredits(credits);
    }

    this.ui.hideModal('credits-modal');
    this.updateUI();
    this.saveTeam();
    this.ui.showSuccess(`Crediti impostati: ${credits}`);
  }

  handleAddPlayer() {
    if (!this.team) {
      this.ui.showError('Devi prima impostare i crediti');
      return;
    }

    const nameInput = document.getElementById('player-name-input');
    const costInput = document.getElementById('player-cost-input');
    const roleInput = document.getElementById('player-role-input');

    const name = nameInput.value.trim();
    const cost = parseInt(costInput.value);
    const role = roleInput.value;

    if (!name) {
      this.ui.showError('Inserisci il nome del giocatore');
      return;
    }

    if (!cost || cost <= 0) {
      this.ui.showError('Inserisci un costo valido');
      return;
    }

    try {
      const player = new Player(name, cost, role);
      this.team.addPlayer(player);
      this.ui.hideModal('add-player-modal');
      this.updateUI();
      this.saveTeam();
      this.ui.showSuccess(`${name} aggiunto alla squadra!`);
    } catch (error) {
      this.ui.showError(error.message);
    }
  }

  handleTeamNameSetup() {
    const nameInput = document.getElementById('team-name-input');
    const name = nameInput.value.trim();

    if (!name) {
      this.ui.showError('Inserisci il nome della squadra');
      return;
    }

    if (!this.team) {
      this.team = new Team(0, name);
    } else {
      this.team.setTeamName(name);
    }

    this.ui.hideModal('team-name-modal');
    this.updateUI();
    this.saveTeam();
    this.ui.showSuccess(`Nome squadra impostato: ${name}`);
  }

  showAddPlayerModal(role) {
    if (!this.team) {
      this.ui.showError('Devi prima impostare i crediti');
      return;
    }

    const roleInput = document.getElementById('player-role-input');
    roleInput.value = role;

    const modalTitle = document.getElementById('add-player-modal-title');
    const roleLabels = {
      goalkeepers: 'Portiere',
      defenders: 'Difensore',
      midfielders: 'Centrocampista',
      strikers: 'Attaccante'
    };
    modalTitle.textContent = `Aggiungi ${roleLabels[role]}`;

    this.ui.showModal('add-player-modal');
  }

  removePlayer(playerId) {
    if (!this.team) return;

    const player = this.team.removePlayer(playerId);
    if (player) {
      this.updateUI();
      this.saveTeam();
      this.ui.showSuccess(`${player.name} rimosso dalla squadra`);
    }
  }

  updateUI() {
    if (!this.team) return;

    this.ui.updateCredits(
      this.team.totalCredits,
      this.team.getTotalSpent(),
      this.team.remainingCredits
    );

    this.ui.updateTeamName(this.team.teamName);

    const roles = ['goalkeepers', 'defenders', 'midfielders', 'strikers'];
    roles.forEach(role => {
      const players = this.team.getPlayersByRole(role);
      const config = this.team.config[role];
      this.ui.renderPlayerSection(
        role,
        players,
        config,
        (r) => this.showAddPlayerModal(r),
        (id) => this.removePlayer(id)
      );
    });
  }

  saveTeam() {
    if (!this.team) return;

    if (this.storage.save(this.team)) {
      console.log('Squadra salvata automaticamente');
    }
  }

  resetTeam() {
    if (!this.ui.confirmAction('Sei sicuro di voler resettare tutti i dati? Questa azione è irreversibile.')) {
      return;
    }

    this.storage.clear();
    this.team = null;
    this.initialized = false;
    window.location.reload();
  }

  async exportToPDF() {
    if (!this.team || this.team.getTotalPlayers() === 0) {
      this.ui.showError('Aggiungi almeno un giocatore prima di esportare');
      return;
    }

    if (typeof html2pdf === 'undefined') {
      this.ui.showError('Libreria PDF non caricata. Ricarica la pagina.');
      return;
    }

    const element = document.querySelector('.container');
    const buttons = document.querySelector('.actions-bar');

    if (buttons) buttons.style.display = 'none';

    const opt = {
      margin: 0.5,
      filename: `${this.team.teamName || 'Formazione'}_Fantacalcio.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().from(element).set(opt).save();
      this.ui.showSuccess('PDF esportato con successo!');
    } catch (error) {
      this.ui.showError('Errore durante l\'esportazione del PDF');
      console.error(error);
    } finally {
      if (buttons) buttons.style.display = 'flex';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FantacalcioApp();
});
