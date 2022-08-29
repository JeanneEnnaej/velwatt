class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.date :date
      t.integer :max_production
      t.integer :total_production
      t.integer :session_duration
      t.integer :score
      t.references :bike, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
