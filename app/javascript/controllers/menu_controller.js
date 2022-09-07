import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="menu"
export default class extends Controller {
  connect() {
    console.log("controller menu")
  }
  static targets = ["production", "session", "avantage", "disconnect"]


















}
