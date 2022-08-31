class CustomSessionsController < Devise::SessionsController
  ## for rails 5+, use before_action, after_action
  # before_filter :before_login, :only => :create
  # after_action :save_ongoing_gamingsession, only: :create

  # private

  # def save_ongoing_gamingsession
  #   if cookies[:gamingsession_id].present?
  #     @gamingsession = Gamingsession.find(cookies[:gamingsession_id])

  #     if @gamingsession.user_id.present?
  #       cookies.delete(:gamingsession_id)
  #     else
  #       @gamingsession.user_id = current_user.id
  #     @gamingsession.save
  #     cookies.delete(:gamingsession_id)
  #     end
  #   end
  # end
end
