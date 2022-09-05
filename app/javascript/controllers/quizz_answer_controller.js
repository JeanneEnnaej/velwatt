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
    this.frigoTarget.classList.replace('quizz-choice-frigo', 'quizz-choice-frigo-active')
    this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
  }

  smartphone(event) {
    this.smartphoneTarget.classList.replace('quizz-choice-smartphone', 'quizz-choice-smartphone-active')
    this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
  }

  tv(event) {
    this.tvTarget.classList.replace('quizz-choice-tv', 'quizz-choice-tv-active')
    this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
  }

  lavelinge(event) {
    const goodAnswer = 10
    this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
    const pts = this.pointsValue
    sum = pts + goodAnswer
    console.log(sum)
    this.scoreTarget.innerText = sum
    console.log(this.gsidTarget.innerText)
    this.updateScoreDB()
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
