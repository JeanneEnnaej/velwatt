class PagesController < ApplicationController
  # permet d'accéder à home sans login
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end
end
