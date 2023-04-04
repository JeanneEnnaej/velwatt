import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="nav-contact"
export default class extends Controller {
  static targets = [ "machin" ]

  connect() {
    console.log("Hello, Stimulus!", this.element)
  }

  hidden() {
    console.log('hidden')
    console.log(this.machinTarget)
    this.machinTarget.classList.toggle('hidden')
  }
}
