class GamingsessionsController < ApplicationController
  # permet d'accéder à show sans login
  skip_before_action :authenticate_user!, only: :show

  # affichage de l'index des gamingsessions que de l'user connecté
  def index
    @gamingsessions = Gamingsession.where(user: current_user)
    @gamingsession_id = params[:gamingsession_id]
  end

  # pdashboard de la gamingsession
  def show
    @gamingsession = Gamingsession.find(params[:id])
    cookies[:gamingsession_id] = @gamingsession.id
    # permet d'avoir les valeurs des records max
    @maxprodsession = Gamingsession.all.order("max_production DESC").limit(1).as_json
    @totalprodsession = Gamingsession.all.order("total_production DESC").limit(1).as_json
  end
end
