class ProductionsController < ApplicationController
  before_action :save_ongoing_gamingsession, only: :totaux
  def totaux
    @gamingsessions = Gamingsession.where(user: current_user)
    @solde = solde_points(@gamingsessions)
    @total_time = total_time(@gamingsessions)
    @total_watt = total_watt(@gamingsessions)
    # @current_user.wallet = (@solde/2)
    @current_user.update(wallet: (@solde / 2))
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
    total_watt = (total_watt.to_f / 7200).round(4)
  end

  def save_ongoing_gamingsession
    # if le cookies avec l'id est présent
    if cookies[:gamingsession_id].present?
      @gamingsession = Gamingsession.find(cookies[:gamingsession_id])
      # si la gamingsession appartient déjà à quelqu'un
      if @gamingsession.user_id.present?
        cookies.delete(:gamingsession_id)
      else
        # si la gamingsession n'appartient à personne
        @gamingsession.user_id = current_user.id
        @gamingsession.save
        cookies.delete(:gamingsession_id)
      end
    end
  end

end
