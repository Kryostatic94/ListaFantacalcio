/**
 * Storage Class
 * Gestisce il salvataggio e il caricamento dei dati in localStorage
 */
export class Storage {
  constructor(key = 'fantacalcio_team') {
    this.key = key;
  }

  save(team) {
    try {
      const data = JSON.stringify(team.toJSON());
      localStorage.setItem(this.key, data);
      return true;
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      return false;
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      return null;
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error('Errore nella cancellazione:', error);
      return false;
    }
  }

  exists() {
    return localStorage.getItem(this.key) !== null;
  }
}
