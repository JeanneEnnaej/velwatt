class AddIpAddressToBikes < ActiveRecord::Migration[7.0]
  def change
    add_column :bikes, :ip_address, :string
  end
end
