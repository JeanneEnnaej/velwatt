class HistoricsController < ApplicationController
  def historique
    @gamingsessions = Gamingsession.where(user: current_user)
  end
end
