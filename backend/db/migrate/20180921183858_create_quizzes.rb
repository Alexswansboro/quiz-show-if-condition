class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.string :title
      t.references :user, foreign_key: true
      t.boolean :published

      t.timestamps
    end
  end
end
