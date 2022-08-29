Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  namespace :gaming do
    resources :sessions, only: [ :index, :show ]
  end
  resources :bikes, only: [] do
    get :game, on: :member
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
