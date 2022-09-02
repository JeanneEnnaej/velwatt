class GamingsessionsController < ApplicationController
  # permet d'accéder à show sans login
  skip_before_action :authenticate_user!, only: [:show, :create]
  before_action :save_ongoing_gamingsession, only: :index

  # affichage de l'index des gamingsessions que de l'user connecté
  def index
    @gamingsessions = current_user.gamingsessions
    # @gamingsession_id = params[:gamingsession_id]
    solde_points
    total_time
    total_watt
  end

  # pdashboard de la gamingsession
  def show
    @gamingsession = Gamingsession.find(params[:id])
    # stock l'id de la gamingsession dans un cookie
    cookies[:gamingsession_id] = @gamingsession.id
    # permet d'avoir les valeurs des records max
    @maxprodsession = Gamingsession.all.order("max_production DESC").limit(1).as_json
    @totalprodsession = Gamingsession.all.order("total_production DESC").limit(1).as_json
  end

  def create
    @session = Gamingsession.new(session_params.merge({date: Date.today}))
    if @session.save!
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def solde_points
    @solde = 0
    @gamingsessions.each do |gs|
      @solde += gs.score
    end
    @solde
  end

  def solde_achats
    @achats = 0
    until @purchases == nil
      @purchases.all.each do |p|
        @achats += p.ticket.price
      end
    end
    @achats
  end

  def total_time
    @total_time = 0
    @gamingsessions.each do |gs|
      @total_time += gs.session_duration
    end
    @total_time = (@total_time/60)
  end

  def total_watt
    @total_watt = 0
    @gamingsessions.each do |gs|
      @total_watt += gs.total_production
    end
    @total_watt
  end

  def session_params
    params.require(:gamingsession).permit(:max_production, :total_production, :session_duration, :score, :bike_id)
  end

  # permet AVANT index de récupérer l'id dans le cookie
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
