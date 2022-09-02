Rails.application.routes.draw do

  devise_for :users, controllers: { sessions: "custom_sessions" }
  root to: "pages#home"
  resources :gamingsessions, only: [ :index, :show, :create ]

  get "totaux", to: "productions#totaux"

  get "advantages", to: "advantages#advantages"

  get "historique", to: "historics#historique"

  resources :bikes, only: [] do
    get :game, on: :member
  end

  resources :tickets, only: [] do
    resources :purchases, only: :create
  end


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
