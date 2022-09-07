class GamingsessionsController < ApplicationController
  # permet d'accéder à show sans login
  skip_before_action :authenticate_user!, only: [:show, :create, :update]


  # affichage de l'index des gamingsessions que de l'user connecté
  def index
    @gamingsessions = current_user.gamingsessions
  end

  def update
    @gamingsession = Gamingsession.find(params[:id])
    @gamingsession.update!(session_params)
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
    @gamingsession = Gamingsession.new(session_params.merge({date: Date.today}))
    if @gamingsession.save!
      render json: {svg: svg, url: gamingsession_url(@gamingsession)}
    else
      head :unprocessable_entity
    end
  end

  private

  def svg
    # @qr_code = RQRCode::QRCode.new("http://localhost:3000/gamingsessions/2")
    qr_code = RQRCode::QRCode.new(gamingsession_url(@gamingsession))
    # permet de mettre le qr code en forme carré noir et blanc
    qr_code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      viewbox: true
    )
  end

  def session_params
    params.require(:gamingsession).permit(:max_production, :total_production, :session_duration, :score, :bike_id)
  end

end
