import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="timer"

let sec = 1;
let min = 10;
let t;
let participantSession;


export default class extends Controller {
  static targets = ["timerView"];

  connect() {
    console.log("timer is here");
  }

  startTimer(participant) {
    console.log("timer connected");
    participantSession = participant;
    this.timer();
  }

  tick(){
    sec--;
    if (sec === -1){
      sec = 59;
      min--;
    }
  }
  add() {
    this.tick();
    this.timerViewTarget.innerText = 
      (min > 9 ? min : "0" + min)
      + ":" + (sec > 9 ? sec : "0" + sec);
      if (min === 0 && sec === 0){
        console.log("timer finish");
      } else {
        this.timer();
      }
  }
  timer() {
      t = setTimeout(this.add.bind(this), 1000);
  }
}
