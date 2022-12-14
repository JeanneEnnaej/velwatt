class PurchasesController < ApplicationController

  def index
    @purchases = Purchase.where(user: current_user)
  end

  def create
    @ticket = Ticket.find(params[:ticket_id])
    @purchase = Purchase.new(ticket: @ticket, user: current_user)

    return unless current_user.wallet >= @purchase.ticket.price

    if @purchase.save
      current_user.wallet -= @purchase.ticket.price
      current_user.save

      redirect_to advantages_path
    else
      render "index", status: :unprocessable_entity
    end
  end
end
