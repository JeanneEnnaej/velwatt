class RenameSessionTable < ActiveRecord::Migration[7.0]
  def change
    rename_table :sessions, :gamingsessions
  end
end
