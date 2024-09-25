from flask import Flask, request, render_template, jsonify
import huya_spider
import douyin_spider

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_flv', methods=['POST'])
def get_flv():
    rid = request.form['room_id']
    flv_urls = huya_spider.get_huya_flv_urls(rid)
    return jsonify(flv_urls)

@app.route('/get_douyin', methods=['POST'])
def get_douyin():
    room_url = request.form['room_url']
    urls = douyin_spider.get_douyin_urls(room_url)
    return jsonify(urls)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9003)