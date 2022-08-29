class BikesController < ApplicationController
  skip_before_action :authenticate_user!
  def game
  end
end
