class ProductionsController < ApplicationController
  def totaux
    @gamingsessions = Gamingsession.where(user: current_user)
    @solde = solde_points(@gamingsessions)
    @total_time = total_time(@gamingsessions)
    @total_watt = total_watt(@gamingsessions)
  end

  private

  def solde_points(gamingsessions)
    solde = 0
    gamingsessions.each do |gs|
      solde += gs.score
    end
    solde
  end

  def total_time(gamingsessions)
    total_time = 0
    gamingsessions.each do |gs|
      total_time += gs.session_duration
    end
    total_time = (total_time/60)
  end

  def total_watt(gamingsessions)
    total_watt = 0
    gamingsessions.each do |gs|
      total_watt += gs.total_production
    end
    total_watt
  end

end
