import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="quizz-answer"
export default class extends Controller {
  connect() {
    console.log("controller quizz")
  }
  static targets = ["frigo", "lavelinge", "smartphone", "tv"]

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
    this.lavelingeTarget.classList.replace('quizz-choice-lavelinge', 'quizz-choice-lavelinge-active')
  }

}
