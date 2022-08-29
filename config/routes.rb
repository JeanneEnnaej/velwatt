Rails.application.routes.draw do

  devise_for :users
  root to: "pages#home"
  resources :sessions, only: [ :index, :show ]
  resources :bikes, only: [] do
    get :game, on: :member
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
