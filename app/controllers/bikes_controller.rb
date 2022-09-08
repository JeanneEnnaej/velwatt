class BikesController < ApplicationController
  # permet de rendre accessible la page bike sans identification
  skip_before_action :authenticate_user!

  # jeu
  def game
    ## créer nouvelle session et mettre l'id en interpolation pour QR code
    # Création du qrcode avec l'url du show de la session
    # @qr_code = RQRCode::QRCode.new("http://localhost:3000/gamingsessions/2")
    # permet de mettre le qr code en forme carré noir et blanc
    @svg = @qr_code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      viewbox: true
    )
  end
end
