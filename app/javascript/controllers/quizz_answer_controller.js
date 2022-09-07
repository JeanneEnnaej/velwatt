import { Controller } from "@hotwired/stimulus"
let sum;
// Connects to data-controller="quizz-answer"
export default class extends Controller {
  connect() {
     console.log("controller quizz")
  }
  static targets = ["frigo", "lavelinge", "smartphone", "tv", "score", "gsid" ]
  static values = {
    points: Number,
  }

  frigo(event) {
    if (this.lavelingeTarget.className === "quizz-choice-lavelinge-active") {
      console.log('deja joué' )

    }

    else {
      this.frigoTarget.classList.replace('quizz-choice-frigo', 'quizz-choice-frigo-active')
      this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')

    }
  }

  smartphone(event) {
    if (this.lavelingeTarget.className === "quizz-choice-lavelinge-active"){
      console.log('deja joué')

    }
    else {

      this.smartphoneTarget.classList.replace('quizz-choice-smartphone', 'quizz-choice-smartphone-active')
      this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
    }
  }

  tv(event) {
    if (this.lavelingeTarget.className === "quizz-choice-lavelinge-active"){
      console.log('deja joué')
    }

    else {
      this.tvTarget.classList.replace('quizz-choice-tv', 'quizz-choice-tv-active')
      this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')

    }
  }

  lavelinge(event) {
    if (this.lavelingeTarget.className === "quizz-choice-lavelinge-active"){

      console.log('deja joué')
    }
    else {

      const goodAnswer = 10
      this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active-succes')
      const pts = this.pointsValue
      sum = pts + goodAnswer
      console.log(sum)
      this.scoreTarget.innerText = sum
      console.log(this.gsidTarget.innerText)
      this.updateScoreDB()

    }
  }

  updateScoreDB(){

    let id = this.gsidTarget.innerText
    fetch(`/gamingsessions/${id}`, {
      method: "PATCH",
      headers: {'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        score: sum
      })
    })
    .then(response => () => {
      if (response.status === 200) {
        console.log("Ok");
      }
    })
    .then(() => {
      console.log("save to db")
    })
  }

}
