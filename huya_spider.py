import requests
import json

def get_huya_flv_urls(rid):
    url = f"https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid={rid}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
    response = requests.get(url=url, headers=headers)
    json_data = response.text
    data = json.loads(json_data)

    if 'data' not in data or 'stream' not in data['data']:
        return {'error': '主播未开播或房间号有误'}

    flv_urls = []
    for lines in range(0, 4):
        flv_url = data['data']['stream']['flv']['multiLine'][lines]['url']
        # 将 http 替换为 https
        flv_url = flv_url.replace('http://', 'https://')
        flv_urls.append(flv_url)

    return flv_urls

def main():
    room_id = input("请输入虎牙直播间房间号: ")
    result = get_huya_flv_urls(room_id)
    if 'error' in result:
        print(result['error'])
    else:
        for i, url in enumerate(result):
            print(f"{url}")

if __name__ == "__main__":
    main()