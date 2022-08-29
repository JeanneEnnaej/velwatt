class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: :show
  def index
  end

  def show
  end
end
