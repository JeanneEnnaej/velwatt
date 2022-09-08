import { Controller } from "@hotwired/stimulus"


let participantSession;
let bikeId = 1; // faire un fetch pour dynamique
let dateSession = 0;
let oldProduct = 0;
let compteur = 0;
let productTotalSession = 0;
let productHour = 0;
let maxProduct = 0;
let api;
let url;
const times = 1000;
let i;


// Connects to data-controller="game-config"
export default class extends Controller {
  static targets = ["compteurValue", "totalValue", "maxProduct", "timerView", 'svg', 'timeLeft'];
  static values = {
    url: String,
    api: String
  };

  connect() {
    console.log("game-config init");
    api = this.apiValue;
    console.log(api)
    this.apiUrl = `${api}/api/v1`;
  }

  disconnect() {
    console.log("hghgh")
    this.endSession()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  initSession() {
    console.log("Init session");

    fetch(`${this.apiUrl}/session/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "session_id": 0,
        "session_date": 0,
        "session_status": "CREATED"
      })
    })
    .then(response => response.json())
    .then((data) => {
      compteur = 0;
      oldProduct = 0;
      maxProduct = 0;
      dateSession = data.session_date;
      this.createParticipant(data);
    });
  }

  startSession(participant) {

    fetch(`${this.apiUrl}session/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "session_id": participant.session_id,
        "session_date": dateSession,
        "session_status": "IN_PROGRESS"
      })
    })
    .then(response => response.json())
    .then(() => {
      console.log("Session Started");
      this.startBike();
      this.getProduction(participant);
    });
  }

  endSession() {
    console.log("session ended");
    this.#apiArduinoEndSession()

    // FAKE DATA
      // maxProduct = 30
      // productTotalSession = 345
      // bikeId = 1
    // END FAKE DATA

    this.#apiWebEndSession()
  }

  #apiWebEndSession() {
    console.log('je fini la session rails')
    this.createGamingSessionDB()
  }


  #apiArduinoEndSession() {
    fetch(`${this.apiUrl}/session/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "session_id": participantSession.session_id,
        "session_date": dateSession,
        "session_status": "ENDED"
      })
    })
    .then(response => response.json())
    .then(() => {
      i = times;
      console.log("session finish");
    });
  }

  createParticipant(session) {
    console.log(session.session_id);

    fetch(`${this.apiUrl}/participate/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "bike_id": bikeId,
        "session_id": session.session_id,
        "participate_production": 0,
        "participate_date": dateSession
      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Participantalon :", data);
      console.log("Connected !");
      participantSession = data;
      this.startSession(data)
    });
  }

  async getProduction(participant) {
    i = 0;
    do {
      console.log(`Boucles : ${i}`);
      fetch(`${this.apiUrl}/participate/findByBikeIdAndSessionId/${participant.bike_id}/${participant.session_id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Get participate product :",data.participate_production);
        this.showProduction(data.participate_production);
      });
      i += 1;
      await this.sleep(180);
    } while (i < times);

  }

  showProduction(product) {



    if (compteur < 5 && product === oldProduct) {
      compteur = 0;
    } else if (product > oldProduct) {
      compteur = Number(product) - oldProduct;
      oldProduct = Number(product);
      console.log("changement de la valeurs");
    }

    if (compteur > maxProduct) {
      maxProduct = compteur;
    }

    productHour = product / 7200 ;
    productTotalSession = Number(product);
    //On renvoie :
    this.totalValueTarget.innerText = `${productHour.toFixed(3)} wh`;
    this.maxProductTarget.innerText = `${maxProduct}`;
    this.compteurValueTarget.innerText = `${compteur}`;
  }

  startBike() {

    fetch(`${this.apiUrl}/arduino/startGame/${times}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(() => {
      console.log("Start : ");
    });
  }

  createGamingSessionDB() {

    const timeLeft = this.timeLeftTarget.innerText.split(':');
    const duration = 600 - ((Number(timeLeft[0])*60) + (Number(timeLeft[1])));

    const score = productTotalSession/100
    fetch("/gamingsessions", {
      method: "POST",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_production: maxProduct,
        total_production: productTotalSession,
        session_duration: duration,
        score: score,
        bike_id: bikeId
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log("save to db", data.svg);
        this.svgTarget.innerHTML = data.svg
      })
  }
}
