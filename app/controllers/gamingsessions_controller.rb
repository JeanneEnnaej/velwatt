class GamingsessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: :show
  def index
    @gamingsessions = Gamingsession.where(user: current_user)
  end

  def show
    @gamingsession = Gamingsession.find(params[:id])
    @maxprodsession = Gamingsession.all.order("max_production DESC").limit(1).as_json
    @totalprodsession = Gamingsession.all.order("total_production DESC").limit(1).as_json


  end
end
