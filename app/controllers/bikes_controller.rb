class BikesController < ApplicationController
  skip_before_action :authenticate_user!
  def game
    # créer nouvelle session et mettre l'id en interpolation pour QR code
    @qr_code = RQRCode::QRCode.new("http://localhost:3000/gamingsessions/2")
    @svg = @qr_code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6
    )
  end
end
