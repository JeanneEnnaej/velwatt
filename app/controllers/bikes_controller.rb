class BikesController < ApplicationController
  # permet de rendre accessible la page bike sans identification
  skip_before_action :authenticate_user!

  # jeu
  def game
  end
end
