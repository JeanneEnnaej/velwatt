class ChangeWalletDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :wallet, :integer, default: 0
  end
end
