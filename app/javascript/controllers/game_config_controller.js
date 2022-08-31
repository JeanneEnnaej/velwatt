import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="game-config"
export default class extends Controller {
  static targets = ["compteur"];

  connect() {
    console.log("game-config init Second try");
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
      console.log("Session id :",data.session_id);
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
      const times = 100;
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
      console.log("getProduction function");
      fetch(`${url}/participate/findByBikeIdAndSessionId/${participant.bike_id}/${participant.session_id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Get participate product :",data.participate_production);
        this.showProduction(data.participate_production);
      });
      i += 1;
      await this.sleep(500);

      if (i === (times - 1)) {
        this.endSession(participant);
      }
    } while (i < times);
    
  }

  showProduction(product) {
    console.log("showProduction function");
    this.compteurTarget.innerText = product;
  }

  startBike(times) {
    fetch(`http://10.10.0.100:4200?=${times}`, {
      method: "GET",
      headers: { "Accept-Language": "fr" }
    })
  }
}
