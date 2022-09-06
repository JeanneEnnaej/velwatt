class AdvantagesController < ApplicationController
  def advantage
    @gamingsessions = Gamingsession.where(user: current_user)
    @current_user.wallet = (solde/2)
  end

  private

  def solde_points(gamingsessions)
    solde = 0
    gamingsessions.each do |gs|
      solde += gs.score
    end
    solde
  end
end
