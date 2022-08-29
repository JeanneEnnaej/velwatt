p "Go la seed !"

p 'seed tips'

Tip.create!(content: "Éteindre les veilles peut permettre d’économiser jusqu’à 10 % de la facture d’électricité (hors chauffage), mais aussi de préserver le matériel.")
Tip.create!(content: "Éteignez les lumières en sortant d’une pièce.")
Tip.create!(content: "Privilégier le programme eco du lave-linge et du lave-vaisselle" )
Tip.create!(content: "Pour faire bouillir de l’eau ou cuire votre plat, mettre un couvercle permet de consommer 25 % d’énergie en moins.")

p "Seed users"

User.create!(first_name: "Toto", last_name: "Titi", email: "toto@toto.com", password: "totototo")
User.create!(first_name: "Tata", last_name: "Tutu", email: "tata@tata.com", password: "tatatata")

p 'seed bike'

Bike.create!(ip_address: "12.345.678.910")

p "seed sessions"

# date en secondes depuis 1970/01, max_prod/total_prod en w/h, session_duration en secondes
Session.create!(date: Time.at(1661787354996/1000), max_production: 240, total_production: 670, session_duration: 900, score: 400, bike_id: 1, user_id: 1)
Session.create!(date: Time.at(1641787354996/1000), max_production: 120, total_production: 420, session_duration: 900, score: 230, bike_id: 1, user_id: 1)
Session.create!(date: Time.at(1631787354996/1000), max_production: 160, total_production: 500, session_duration: 900, score: 258, bike_id: 1, user_id: 2)

p"finito"
