echo '🚺 🚺 🚺 Running MongoDB dump ...'
mongodump
echo '🚺 🚺 🚺 Running MongoDB restore ...'
cd dump/kasie_transie_db
mongorestore --uri mongodb+srv://malengadev:Abm96EfXi33AvcEA@cluster0.njz1rn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 /kasie_transie_db

echo '🚺 🚺 🚺 Done Running MongoDB dump and restore'
