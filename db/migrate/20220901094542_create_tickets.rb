class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.string :company
      t.text :content
      t.integer :price

      t.timestamps
    end
  end
end
