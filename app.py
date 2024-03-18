from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import requests

app = Flask(__name__)
db_name = 'data.db'

def create_table():
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)''')
    conn.commit()
    conn.close()

create_table()

def fetch_mental_health_news(api_key):
    url = 'https://newsapi.org/v2/everything'
    params = {
        'apiKey': api_key,
        'q': 'mental health',  # Search query for mental health
        'language': 'en',       # Language of the articles
        'pageSize': 5          # Limit to 5 articles per request
    }
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            articles = data.get('articles', [])
            return articles
        else:
            print(f"Error fetching mental health news: {response.status_code}")
            return []
    except Exception as e:
        print(f"Error fetching mental health news: {e}")
        return []

@app.route('/')
def index():
    api_key = '15f06e7f34ad42a2b6e04a133e1e302d'
    news_articles = fetch_mental_health_news(api_key)
    
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    c.execute('''SELECT * FROM items''')
    items = c.fetchall()
    conn.close()
    
    return render_template('mental_news.html', news_articles=news_articles, items=items)

@app.route('/add', methods=['POST'])
def add_item():
    name = request.form['name']
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    c.execute('''INSERT INTO items (name) VALUES (?)''', (name,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    c.execute('''DELETE FROM items WHERE id = ?''', (item_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
