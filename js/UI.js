/**
 * UI Class
 * Gestisce l'interfaccia utente
 */
export class UI {
  constructor() {
    this.elements = {
      creditsValue: document.getElementById('credits-value'),
      spentValue: document.getElementById('spent-value'),
      remainingValue: document.getElementById('remaining-value'),
      teamNameDisplay: document.getElementById('team-name-display'),
      sectionsContainer: document.getElementById('sections-container')
    };
  }

  updateCredits(total, spent, remaining) {
    if (this.elements.creditsValue) {
      this.elements.creditsValue.textContent = total;
    }
    if (this.elements.spentValue) {
      this.elements.spentValue.textContent = spent;
    }
    if (this.elements.remainingValue) {
      this.elements.remainingValue.textContent = remaining;

      if (remaining < 0) {
        this.elements.remainingValue.style.color = 'var(--danger-color)';
      } else if (remaining < 50) {
        this.elements.remainingValue.style.color = 'var(--warning-color)';
      } else {
        this.elements.remainingValue.style.color = 'var(--primary-color)';
      }
    }
  }

  updateTeamName(name) {
    if (this.elements.teamNameDisplay) {
      if (name) {
        this.elements.teamNameDisplay.textContent = name;
        this.elements.teamNameDisplay.parentElement.classList.remove('hidden');
      } else {
        this.elements.teamNameDisplay.parentElement.classList.add('hidden');
      }
    }
  }

  renderPlayerSection(role, players, config, onAdd, onRemove) {
    const section = document.getElementById(`${role}-section`);
    if (!section) return;

    const playersContainer = section.querySelector('.players-grid');
    const addButton = section.querySelector('.add-player-btn');
    const playerCount = section.querySelector('.player-count');

    if (playerCount) {
      playerCount.textContent = `${players.length}/${config.max}`;
    }

    if (playersContainer) {
      playersContainer.innerHTML = '';

      if (players.length === 0) {
        playersContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚽</div>
            <p class="empty-state-text">Nessun giocatore aggiunto</p>
          </div>
        `;
      } else {
        players.forEach(player => {
          const card = this.createPlayerCard(player, onRemove);
          playersContainer.appendChild(card);
        });
      }
    }

    if (addButton) {
      addButton.disabled = players.length >= config.max;
      addButton.onclick = () => onAdd(role);
    }
  }

  createPlayerCard(player, onRemove) {
    const card = document.createElement('div');
    card.className = 'player-card slide-in';
    card.innerHTML = `
      <div class="player-info">
        <div class="player-details">
          <div class="player-name">${this.escapeHtml(player.name)}</div>
          <div class="player-cost">
            <span>Costo:</span>
            <span class="cost-value">${player.cost}</span>
            <span>${player.cost === 1 ? 'Credito' : 'Crediti'}</span>
          </div>
        </div>
        <div class="player-actions">
          <button class="btn btn-danger btn-sm remove-player-btn" data-player-id="${player.id}">
            ✕
          </button>
        </div>
      </div>
    `;

    const removeBtn = card.querySelector('.remove-player-btn');
    removeBtn.onclick = () => {
      if (confirm(`Vuoi rimuovere ${player.name}?`)) {
        onRemove(player.id);
      }
    };

    return card;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      const firstInput = modal.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      const form = modal.querySelector('form');
      if (form) {
        form.reset();
      }
    }
  }

  showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-message">${this.escapeHtml(message)}</div>
      <div class="toast-close">✕</div>
    `;

    document.body.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.onclick = () => toast.remove();

    setTimeout(() => {
      toast.style.transition = 'opacity var(--transition-base)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  confirmAction(message) {
    return confirm(message);
  }

  promptInput(message, defaultValue = '') {
    return prompt(message, defaultValue);
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showWarning(message) {
    this.showToast(message, 'warning');
  }
}
