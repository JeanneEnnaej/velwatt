class Gamingsession < ApplicationRecord
  belongs_to :bike
  belongs_to :user, optional: true

  validates :date, :max_production, :total_production, :session_duration, :score, :bike_id, presence: true
end
