from flask import Flask, render_template
import requests

app = Flask(__name__)

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
    api_key = '15f06e7f34ad42a2b6e04a133e1e302d'  # Replace with your actual API key
    news_articles = fetch_mental_health_news(api_key)
    
    if not news_articles:
        # Handle case where news_articles is empty
        error_message = "No news articles available."
        return render_template('index.html', error_message=error_message)
    else:
        return render_template('index.html', news_articles=news_articles)

if __name__ == "__main__":
    app.run(debug=True)
