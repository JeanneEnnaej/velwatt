class GamingsessionsController < ApplicationController
  # permet d'accéder à show sans login
  skip_before_action :authenticate_user!, only: :show
  before_action :save_ongoing_gamingsession, only: :index

  # affichage de l'index des gamingsessions que de l'user connecté
  def index
    @gamingsessions = current_user.gamingsessions
    # @gamingsession_id = params[:gamingsession_id]
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

  private

  #permet AVANT index de récupérer l'id dans le cookie
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
