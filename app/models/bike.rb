class Bike < ApplicationRecord
  has_many :gamingsessions

  validates :ip_address, presence: true
end
