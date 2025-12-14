/**
 * Player Class
 * Rappresenta un giocatore del Fantacalcio
 */
export class Player {
  constructor(name, cost, role) {
    this.id = this.generateId();
    this.name = name;
    this.cost = parseInt(cost);
    this.role = role;
    this.createdAt = new Date().toISOString();
  }

  generateId() {
    return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      cost: this.cost,
      role: this.role,
      createdAt: this.createdAt
    };
  }

  static fromJSON(data) {
    const player = new Player(data.name, data.cost, data.role);
    player.id = data.id;
    player.createdAt = data.createdAt;
    return player;
  }
}
