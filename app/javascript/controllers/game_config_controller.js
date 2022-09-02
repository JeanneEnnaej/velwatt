import { Controller } from "@hotwired/stimulus"


let participantSession;
let bikeId = 1;
let dateSession = 0;
let oldProduct = 0;
let compteur = 0;
let productTotalSession = 0;
let productHour = 0;
let maxProduct = 0;
const times = 300;
let i;


// Connects to data-controller="game-config"
export default class extends Controller {
  static targets = ["compteurValue", "totalValue", "maxProduct", "timerView"];
  static values = { url: String };

  connect() {
    console.log("game-config init");
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  initSession() {
    console.log("Init session");
    const ipAdress = "10.10.0.10";
    const url = `http://${ipAdress}/api/v1`;

    fetch(`${url}/session/save`, {
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
      this.createParticipant(url, data);
    });
  }

  startSession(participant) {
    const ipAdress = "10.10.0.10";
    const url = `http://${ipAdress}/api/v1`;

    fetch(`${url}/session/save`, {
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
      this.startBike(times);
      this.getProduction(url, participant, times);
    });
  }

  endSession(partiipant) {
    console.log("session ended");
    window.location.reload();
    const ipAdress = "10.10.0.10";
    const url = `http://${ipAdress}/api/v1`;

    fetch(`${url}/session/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "session_id": participantSession.session_id,
        "session_date": dateSession,
        "session_status": "ENDED"
      })
    })
    .then(response => response.json())
    .then((data) => {
      this.createGamingSessionDB();
      console.log("session finish");
    });
  }

  createParticipant(url, session) {
    console.log(session.session_id);

    fetch(`${url}/participate/save`, {
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
      console.log("Participantalon :",data);
      console.log("Connected !");
      participantSession = data;
      this.startSession(data)
    });
  }

  async getProduction(url, participant, times) {
    i = 0;
    do {
      console.log(`Boucles : ${i}`);
      fetch(`${url}/participate/findByBikeIdAndSessionId/${participant.bike_id}/${participant.session_id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Get participate product :",data.participate_production);
        this.showProduction(data.participate_production, times);
      });
      i += 1;
      await this.sleep(180);
    } while (i < times);
    
  }

  showProduction(product, times) {

     
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
    this.maxProductTarget.innerText = `${maxProduct} w`;
    this.compteurValueTarget.innerText = `${compteur} w`;
  }

  startBike(times) {
    fetch(`http://10.10.0.100:4200?=${times}`, {
      method: "GET",
      headers: { "Accept-Language": "fr" }
    })
  }

  createGamingSessionDB() {
    fetch("/gamingsessions", {
      method: "POST",
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_production: maxProduct,
        total_production: productTotalSession,
        session_duration: 100,
        score: 10,
        bike_id: bikeId
      })
    })
      .then(response => () => {
        if (response.status === 200) {
          console.log("ok");
        }
      })
      .then((data) => {
        console.log("save to db");
      })
  }
}
