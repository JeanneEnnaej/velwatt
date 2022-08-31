class ChangeUserForeignKeyInGamingSession < ActiveRecord::Migration[7.0]
  def change
    change_table :gamingsessions do |t|
      t.change :user_id, :bigint, null: true, foreign_key: true
    end
  end
end
