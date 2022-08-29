class Bike < ApplicationRecord
  has_many :sessions

  validates :ip_address, presence: true
end
