# ⚽ Lista Fantacalcio - Modern Edition

Una moderna applicazione web per gestire la tua squadra di Fantacalcio con un'interfaccia elegante e intuitiva.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Caratteristiche

- 🎨 **UI Moderna e Responsive** - Design elegante che funziona su tutti i dispositivi
- 💾 **Salvataggio Automatico** - I tuoi dati vengono salvati automaticamente nel browser
- 📱 **Mobile-First** - Ottimizzato per dispositivi mobili e desktop
- 📄 **Esportazione PDF** - Esporta la tua squadra in formato PDF
- ⚡ **Performance** - Veloce e reattivo con animazioni fluide
- 🔄 **Gestione Crediti** - Traccia i crediti spesi e rimanenti in tempo reale
- ✅ **Validazione** - Controlli automatici per evitare errori

## 🏆 Composizione Squadra

La tua squadra deve includere:
- **3 Portieri** (GK)
- **8 Difensori** (DF)
- **8 Centrocampisti** (CC)
- **6 Attaccanti** (AT)

**Totale: 25 giocatori**

## 🚀 Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/Kryostatic94/ListaFantacalcio.git
   cd ListaFantacalcio
   ```

2. **Apri l'applicazione**
   - Apri semplicemente il file `index.html` nel tuo browser
   - Oppure usa un server locale:
     ```bash
     # Con Python 3
     python -m http.server 8000

     # Con Node.js (http-server)
     npx http-server
     ```

3. **Inizia a usare l'app**
   - Imposta i crediti disponibili
   - Aggiungi il nome della tua squadra
   - Inizia ad acquistare giocatori!

## 📖 Come Usare

### 1. Imposta i Crediti
Clicca su **"💰 Imposta Crediti"** e inserisci il budget disponibile per l'asta (es. 500 crediti).

### 2. Aggiungi il Nome della Squadra
Clicca su **"✏️ Nome Squadra"** e inserisci il nome della tua squadra.

### 3. Aggiungi Giocatori
- Clicca sul pulsante **"+ Aggiungi [Ruolo]"** nella sezione corrispondente
- Inserisci nome e costo del giocatore
- Il sistema controllerà automaticamente:
  - Crediti disponibili
  - Numero massimo di giocatori per ruolo

### 4. Gestisci la Squadra
- **Rimuovi giocatori**: Clicca sulla ✕ sulla card del giocatore
- **Salva**: I dati vengono salvati automaticamente, ma puoi usare il pulsante "💾 Salva"
- **Esporta PDF**: Clicca su "📄 Esporta PDF" per scaricare la tua formazione
- **Reset**: Clicca su "🔄 Reset" per ricominciare da zero

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Markup semantico moderno
- **CSS3** - Custom Properties, Flexbox, Grid, Animations
- **JavaScript ES6+** - Moduli, Classi, Arrow Functions
- **LocalStorage API** - Salvataggio dati locale
- **html2pdf.js** - Generazione PDF

## 📁 Struttura del Progetto

```
ListaFantacalcio/
├── index.html              # File HTML principale
├── css/
│   └── styles.css         # Stili moderni e responsive
├── js/
│   ├── app.js            # Logica principale dell'applicazione
│   ├── Player.js         # Classe Player
│   ├── Team.js           # Classe Team
│   ├── UI.js             # Gestione interfaccia utente
│   └── Storage.js        # Gestione localStorage
├── assets/               # Risorse (immagini, icone)
├── index.old.html        # Versione precedente (backup)
├── README.md             # Questo file
└── LICENSE              # Licenza MIT
```

## 🎨 Caratteristiche Tecniche

### Architettura Modulare
Il codice è organizzato in moduli ES6+ per una migliore manutenibilità:

- **Player.js**: Gestisce i singoli giocatori
- **Team.js**: Gestisce la squadra e le logiche di business
- **UI.js**: Gestisce l'interfaccia utente e le interazioni
- **Storage.js**: Gestisce il salvataggio e caricamento dati
- **app.js**: Coordina tutti i moduli

### Design System
L'applicazione utilizza un design system completo con:
- Palette colori moderna
- Sistema di spaziature consistente
- Tipografia scalabile
- Componenti riutilizzabili
- Animazioni fluide

### Responsive Design
L'interfaccia si adatta automaticamente a:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔧 Personalizzazione

### Modificare i Colori
Puoi personalizzare i colori modificando le variabili CSS in `css/styles.css`:

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  /* ... altre variabili ... */
}
```

### Modificare le Regole della Squadra
Puoi modificare il numero di giocatori per ruolo in `js/Team.js`:

```javascript
this.config = {
  goalkeepers: { min: 3, max: 3, label: 'Portieri', icon: 'GK' },
  defenders: { min: 8, max: 8, label: 'Difensori', icon: 'DF' },
  // ...
};
```

## 🐛 Risoluzione Problemi

### I dati non vengono salvati
- Assicurati che il browser supporti localStorage
- Controlla che non sia attiva la navigazione in incognito
- Verifica che non ci siano estensioni che bloccano lo storage

### Il PDF non viene generato
- Controlla la connessione internet (richiede il CDN di html2pdf.js)
- Verifica che non ci siano blocchi di script nel browser

### L'app non funziona
- Apri la Console del browser (F12) per vedere eventuali errori
- Assicurati di usare un browser moderno (Chrome, Firefox, Safari, Edge)

## 🤝 Contribuire

Contributi, segnalazioni di bug e richieste di funzionalità sono benvenuti!

1. Fai un Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Changelog

### Version 2.0.0 (2025)
- ✨ Completo refactoring con architettura modulare
- 🎨 UI moderna e responsive
- 💾 Salvataggio automatico con localStorage
- 📱 Ottimizzazione mobile-first
- 🔔 Sistema di notifiche toast
- ♿ Miglioramenti accessibilità
- ⚡ Performance ottimizzate

### Version 1.0.0
- 🎉 Release iniziale con funzionalità base
- Single-file HTML con Vanilla JS

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.

## 👨‍💻 Autore

Creato come progetto di training per imparare sviluppo web moderno.

## 🙏 Ringraziamenti

- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) per la funzionalità di esportazione PDF
- La community di sviluppatori web per l'ispirazione e le best practices

---

**Buon Fantacalcio! ⚽🏆**
