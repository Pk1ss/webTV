使用方法(Debian/Ubuntu)

克隆本项目
```bash
    git clone https://github.com/Pk1ss/webTV /opt/webTV
```
安装python和虚拟环境
```bash
    sudo apt install python3
    sudo apt install python3-venv
    python3 -m venv /opt/webTVenv
```
进入虚拟环境    
```bash
    source webTV/bin/activate
```
安装python包
```bash
    pip install -r /opt/webTV/requirements.txt
```
编写/etc/systemd/system/webTV.service
```
[Unit]
Description=webTV
After=network.target
[Service]
User=root
WorkingDirectory=/opt/webTV   #本项目路径
ExecStart=/opt/webTVenv/bin/gunicorn -w 4 -b 127.0.0.1:9003 app:app   
Restart=always
[Install]
WantedBy=multi-user.target
```
启动
```bash
    systemctl start webTV
```
查看状态
```bash
    systemctl status webTV
```
