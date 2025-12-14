/**
 * Team Class
 * Gestisce la squadra di Fantacalcio
 */
import { Player } from './Player.js';

export class Team {
  constructor(initialCredits = 0, teamName = '') {
    this.totalCredits = parseInt(initialCredits);
    this.remainingCredits = parseInt(initialCredits);
    this.teamName = teamName;
    this.players = {
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      strikers: []
    };
    this.config = {
      goalkeepers: { min: 3, max: 3, label: 'Portieri', icon: 'GK' },
      defenders: { min: 8, max: 8, label: 'Difensori', icon: 'DF' },
      midfielders: { min: 8, max: 8, label: 'Centrocampisti', icon: 'CC' },
      strikers: { min: 6, max: 6, label: 'Attaccanti', icon: 'AT' }
    };
  }

  setCredits(credits) {
    this.totalCredits = parseInt(credits);
    this.remainingCredits = parseInt(credits) - this.getTotalSpent();
  }

  setTeamName(name) {
    this.teamName = name;
  }

  addPlayer(player) {
    const role = player.role;

    if (!this.canAddPlayer(role)) {
      throw new Error(`Hai raggiunto il numero massimo di ${this.config[role].label}`);
    }

    if (player.cost > this.remainingCredits) {
      throw new Error('Crediti insufficienti');
    }

    this.players[role].push(player);
    this.remainingCredits -= player.cost;
    return true;
  }

  removePlayer(playerId) {
    for (const role in this.players) {
      const index = this.players[role].findIndex(p => p.id === playerId);
      if (index !== -1) {
        const player = this.players[role][index];
        this.players[role].splice(index, 1);
        this.remainingCredits += player.cost;
        return player;
      }
    }
    return null;
  }

  canAddPlayer(role) {
    return this.players[role].length < this.config[role].max;
  }

  isRoleComplete(role) {
    return this.players[role].length >= this.config[role].min;
  }

  getPlayersByRole(role) {
    return this.players[role];
  }

  getTotalPlayers() {
    return Object.values(this.players).reduce((sum, arr) => sum + arr.length, 0);
  }

  getTotalSpent() {
    return this.totalCredits - this.remainingCredits;
  }

  isComplete() {
    return Object.keys(this.players).every(role => this.isRoleComplete(role));
  }

  toJSON() {
    return {
      totalCredits: this.totalCredits,
      remainingCredits: this.remainingCredits,
      teamName: this.teamName,
      players: {
        goalkeepers: this.players.goalkeepers.map(p => p.toJSON()),
        defenders: this.players.defenders.map(p => p.toJSON()),
        midfielders: this.players.midfielders.map(p => p.toJSON()),
        strikers: this.players.strikers.map(p => p.toJSON())
      }
    };
  }

  static fromJSON(data) {
    const team = new Team(data.totalCredits, data.teamName);
    team.remainingCredits = data.remainingCredits;

    for (const role in data.players) {
      team.players[role] = data.players[role].map(p => Player.fromJSON(p));
    }

    return team;
  }
}
