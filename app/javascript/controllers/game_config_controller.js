import { Controller } from "@hotwired/stimulus"

let OldProduct = 0;
let Compteur = 0;
let productTimes = 0;
const times = 1000;

// Connects to data-controller="game-config"
export default class extends Controller {
  static targets = ["compteurValue", "totalValue"];

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
      Compteur = 0;
      OldProduct = 0;
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
        "session_date": 0,
        "session_status": "IN_PROGRESS"
      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Session Started");
      this.startBike(times);
      this.getProduction(url, participant, times);
    });
  }

  endSession(participant) {
    const ipAdress = "10.10.0.10";
    const url = `http://${ipAdress}/api/v1`;

    fetch(`${url}/session/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "session_id": participant.session_id,
        "session_date": 0,
        "session_status": "ENDED"
      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log("session finish");
    });
  }

  createParticipant(url, session) {
    console.log(session.session_id);

    fetch(`${url}/participate/save`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "bike_id": 1,
        "session_id": session.session_id,
        "participate_production": 0,
        "participate_date": session.session_date
      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Participantalon :",data);
      console.log("Connected !");
      this.startSession(data)
    });
  }

  async getProduction(url, participant, times) {
    let i = 0;
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

      if (i === (times - 1)) {
        this.endSession(participant);
      }
    } while (i < times);
    
  }

  showProduction(product, times) {

    if (product > OldProduct) {
      Compteur = Number(product) - OldProduct;
      OldProduct = Number(product);
      console.log("changement de la valeurs");
    }

    productTimes = product / 7200 ;
    //On renvoie :
    this.totalValueTarget.innerText = `${productTimes.toFixed(3)} wh`;

    this.compteurValueTarget.innerText = `${Compteur} w`;
  }

  startBike(times) {
    fetch(`http://10.10.0.100:4200?=${times}`, {
      method: "GET",
      headers: { "Accept-Language": "fr" }
    })
  }
}
