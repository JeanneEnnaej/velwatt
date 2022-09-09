import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="game-animated"
export default class extends Controller {
  static targets = [
    "pageGame",
    "gameVisuel",
    "compteurTime",
    "gameMessage",
    "gameMessageTxt",
    "btnStart",
    "btnEnd",
    "btnRestart",
    "totalValueInfo",
    "QRcodes"
  ];

  connect() {
    console.log("ControllerAnimatedGame");
  }

  btnStart() {
    this.pageGameTarget.style.animation="startgame 1s ease"
    this.pageGameTarget.style.animationFillMode="forwards"
    this.btnStartTarget.style.animation="focusdown 2s ease"
    this.btnStartTarget.style.animationFillMode="forwards"
    this.gameVisuelTarget.style.animation="focusup 2s ease"
    this.gameVisuelTarget.style.animationFillMode="forwards"
    this.compteurTimeTarget.style.animation="focusup 2s ease"
    this.compteurTimeTarget.style.animationFillMode="forwards"
    this.btnEndTarget.style.animation="focusup 2s ease"
    this.btnEndTarget.style.animationFillMode="forwards"
    this.gameMessageTarget.style.animation="focusmessage 5s 1s ease"
    this.gameMessageTxtTarget.innerHTML="Pédale pendant <span style='color:#C55346'>10 minutes</span> et produit ton électricité"
  }

  end() {
    this.pageGameTarget.style.animation="endgame 2s ease"
    this.pageGameTarget.style.animationFillMode="forwards"
    this.gameVisuelTarget.style.animation="focusdown 2s ease"
    this.gameVisuelTarget.style.animationFillMode="forwards"
    this.compteurTimeTarget.style.animation="focusdown 2s ease"
    this.compteurTimeTarget.style.animationFillMode="forwards"
    this.btnEndTarget.style.animation="focusdown 2s ease"
    this.btnEndTarget.style.animationFillMode="forwards"
    this.btnRestartTarget.style.animation="focusup 2s ease"
    this.btnRestartTarget.style.animationFillMode="forwards"
    this.QRcodesTarget.style.animation="focusup 2s 1.2s ease"
    this.QRcodesTarget.style.animationFillMode="forwards"
    this.gameMessageTarget.style.animation="fixemessage 5s 1s ease"
    this.gameMessageTarget.style.animationFillMode="forwards"
    this.gameMessageTxtTarget.innerHTML="Félicitations ! Maintenant scanne le <span style='color:#C55346'>QRcode</span> pour voir les résultats de ta session"
  }

  restart(){
    window.location.reload();
  }
}
