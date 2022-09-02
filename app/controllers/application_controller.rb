class ApplicationController < ActionController::Base
  # demande l'authentification du user dans TOUTES les pages
  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?
  # permet de changer les strong params de User en ajoutant first et last name
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :wallet])
  end

  # permet d'arriver sur l'index des gamingsessions après le login
  def after_sign_in_path_for(resource)
    stored_location_for(resource) || gamingsessions_path
  end
end
