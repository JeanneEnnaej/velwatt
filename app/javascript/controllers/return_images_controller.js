import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="return-images"
export default class extends Controller {
  connect() {
    console.log("hello")
  }
}