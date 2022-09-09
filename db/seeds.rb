p "On pete touuut!"

Tip.destroy_all
Gamingsession.destroy_all
Bike.destroy_all
Purchase.destroy_all
Ticket.destroy_all
User.destroy_all

p "Go la seed !"

p "Seed users"

User.create!(first_name: "Jeanne", last_name: "Desmier", email: "desmierjeanne@gmail.com", password: "lewagon", wallet: 150)

p 'seed bike'

Bike.create!(ip_address: "12.345.678.910") if Bike.count.zero?


p "seed sessions"

# date en secondes depuis 1970/01, max_prod/total_prod en w/h, session_duration en secondes
Gamingsession.create!(date: Time.at(1657497600), max_production: 220, total_production: 144000, session_duration: 600, score: 1440, bike_id: Bike.last.id, user_id: User.last.id )
Gamingsession.create!(date: Time.at(1657497600), max_production: 120, total_production: 108000, session_duration: 600, score: 1080, bike_id: Bike.last.id, user_id: User.last.id)
Gamingsession.create!(date: Time.at(1659052800), max_production: 160, total_production: 122400, session_duration: 600, score: 1224, bike_id: Bike.last.id, user_id: User.last.id )
Gamingsession.create!(date: Time.at(1659484800), max_production: 130, total_production: 100800, session_duration: 600, score: 1008, bike_id: Bike.last.id, user_id: User.last.id )
Gamingsession.create!(date: Time.at(1660521600), max_production: 215, total_production: 115200, session_duration: 600, score: 1152, bike_id: Bike.last.id, user_id: User.last.id )
Gamingsession.create!(date: Time.at(1661990400), max_production: 170, total_production: 93600, session_duration: 600, score: 936, bike_id: Bike.last.id, user_id: User.last.id )


# 1657497600 2022-07-11
# 1657756800 2022-07-14
# 1659052800 2022-07-29
# 1659484800 2022-08-03
# 1660521600 2022-08-15
# 1661990400 2022-09-01
p "tickets"

Ticket.create!(company: "Décathlon", content: "5% de reduction sur les produits outdoor", price: 70)
Ticket.create!(company: "Reforest'Action", content: "Plantez 5 arbres grâce à Reforest'Action", price: 65)


p"finito"
