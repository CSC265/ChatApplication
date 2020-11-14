import mysql.connector
from mysql.connector import Error
import datetime



def create_connection(host_name, username, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host = host_name,
            user = username, 
            password = user_password,
            database = db_name
        )
        print("MySQL database connection successful.")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

connection = create_connection("localhost", "CSC265","Fall2020", "chatapp")

def execute_query(connection):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO users (first_name, last_name, email, username, password) VALUES (%s,%s,%s,%s,%s)", (first_name,last_name,email,username,password))
        connection.commit()
        print("Query excecuted sucessfully.")
    except Error as e:
        print(f"The error '{e}' occurred")

#Registration form variables
first_name = "TaNasha"
last_name = "H"
email = "TaNasha.H@gmail.com"
username = "TaNashaH"
password = "idk"

execute_query(connection)