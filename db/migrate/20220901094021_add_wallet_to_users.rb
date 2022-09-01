class AddWalletToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :wallet, :integer
  end
end
