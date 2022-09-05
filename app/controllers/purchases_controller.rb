class PurchasesController < ApplicationController

  def index
    @purchases = Purchase.where(user: current_user)
  end

  def create
    @ticket = Ticket.find(params[:ticket_id])
    @purchase = Purchase.new(ticket: @ticket, user: current_user)

    if @purchase.save
      current_user.update(wallet: current_user.wallet - @ticket.price)
      redirect_to advantages_path
    else
      render "index", status: :unprocessable_entity
    end
  end
end
